const crypto = require('crypto')
const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// Global Errors Handler
const AppError = require('../utils/ErrorHandler');
// Emails
const sendEmail = require('../utils/email');
// Tools
const signYsendToken = require('../utils/tools')


exports.signup = async ( req , res , next ) => {
  try {
    // Sign User Up
    const nueUser = await User.create({
      name: req.body.name ,
      email: req.body.email ,
      password: req.body.password ,
      passwordConfirm: req.body.passwordConfirm 
      // Roles Only to be updated from MongoCompass only
      // role: req.body.role
    });

    signYsendToken(201 , nueUser , res)
  } 
  catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}

exports.logIn = async ( req , res , next ) => {
  try {
    const { email , password } = req.body;
    // data exist?
    if(!email || !password ){
      return next(new AppError('Please provide email and password' , 400));
    }
    // correct password for user ?
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword( password , user.password);

    // Avoid giving specific info 
    if( !user ||!correct || correct === null ) {
      return next( new AppError('Incorrect email or password' , 401 ))
    }

    signYsendToken(200 , user , res)
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

// Middleware for PROTECTED ROUTES

exports.protect = async (req , res , next) => {
  try {
    let token;
    // Check for token
    if(
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
      return next( new AppError( 'User not logged in' , 401 ))
    }
    // Verify token
    const decoded = await promisify(jwt.verify)( token , process.env.JWT_SECRET ) 
    
    // User with current Token exists ?
    const currentUser = await User.findById(decoded.id)
    if(!currentUser)
    {
      return next( new AppError('User associated with this token does not longer exists' , 401))
    }

    // User changed password after JWT issued ?
    const { passwordChangedAt } = currentUser
    if(passwordChangedAt) { 
      //Profiling a valid comparison iat vs timeStampToken 
      const timeSFormat = parseInt( passwordChangedAt.getTime() / 1000 , 10 )
      const boleano = decoded.iat < timeSFormat
      if(boleano) {
        return next(
          new AppError( 'New password recently set , please log in again' , 401 )
        )
      } 
    }
    // Everythink OK , Access Granted
    req.user = currentUser;
    next();
  } 
  catch (error) {
    res.status(500).json({ msg: error.message })
  }
} 

// Roles for Admins & Users
exports.restrictTo = (...roles) => {
  return ( req , res , next ) => {
    // roles [ 'admin' ]  ==> role='user'
    if(!roles.includes( req.user.role )){
      return next(
        new AppError( 'Sorry, you do not have permission' , 403 )
      );
    }
    next();
  }
}

// Forgot Password
exports.forgotPassword = async (  req , res , next ) => {
  //Get user from his mail
  const user = await User.findOne({ email: req.body.email })
  if(!user){
    return next( new AppError("There's no user with that email" , 404))
  }
  //Generate random token & save modifications into DB
  const resetToken = user.generateToken() 
  // down validators req. on model
  await user.save({ validateBeforeSave: false })

  //Send it by mail
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  // Message
  const message = `
  Forgot your password ? Click here: ${resetURL}`
  
  try {
    await sendEmail({
      email: user.email ,
      subject: 'Your password reset token will expires in the next 10 minutes' ,
      message 
    })

    res.status(200).json({ 
      status: 'success' ,
      msg: 'Token sent by email' 
    })
  } 
  catch (error) {
    user.passwordResetToken = undefined 
    user.passwordResetExpires = undefined
    await user.save({ validateBeforeSave: false })

    return next( 
      new AppError ( error.message ),
      500
    ) 
  }
}

// Reset Password
exports.resetPassword = async ( req , res , next ) => {
  try {
    // Get user based on token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

    const user = await User.findOne({ 
      passwordResetToken: hashedToken , 
      passwordResetExpires: { $gt: Date.now()} 
    })
    // Token did not expire ? User exists? ==> set new password
    if(!user){
      return next( new AppError( 'Token invalid or has expired' , 400 ))
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save()

    // Update changePasswordAt field for current user
    // => line 60 at userModel   
    signYsendToken(200 , user , res)
  } 
  catch (error) {
    return next( 
      new AppError ( error.message ),
      500
    ) 
  }
}

// User updating his pass while logged in
exports.updatePassword = async ( req , res , next ) => {
  try {
    // Get user => req.user.id => coz user logged in
    const user = await User.findById(req.user.id).select('+password');
    
    // Current Pass => ok ?
    if(!(await user.correctPassword( req.body.passwordCurrent , user.password))){
      return next(
        new AppError( 'Wrong password', 401 )
      )
    }
    // ok ? then update Pass
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    await user.save()

    signYsendToken(200 , user , res , sent=false )
  } 
  catch (error) {
    return next( new AppError ( error.message ), 500) 
  }
}
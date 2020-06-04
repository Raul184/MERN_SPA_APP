const { promisify } = require('util')
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs')
const UserModel = require('./../models/users');
const AppErrors = require('./../utils/AppErrors');
const sendEmail = require('./../utils/email');

const generateToken = id => jwt.sign(
  { id } , 
  process.env.JWT_SECRET ,
  { expiresIn: process.env.JWT_SECRET_EXPIRES }
)

exports.signup = async ( req , res , next ) => {
  try {
    const newUser = await UserModel.create({
      name: req.body.name ,
      email: req.body.email ,
      password: req.body.password ,
      passwordConfirm: req.body.passwordConfirm
    })  

    console.log(process.env.JWT_SECRET  , process.env.JWT_SECRET_EXPIRES);

    const token = generateToken( newUser._id ) 
    
    return res.status(200).json({
      status: 'success' ,
      token ,
      data: {
        user: newUser
      }
    })
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error.message
    })  
  }
}


exports.login = async ( req ,res , next ) => {
  try {
    const { email , password } = req.body;
    // Check
    if( !email || !password ) {
      return next( 
        new AppErrors( 'Please provide email & password' , 400 ))
    }
    // Find
    const user = await UserModel.findOne({ email }).select('+password')

    if( !user || !await user.correctPass( password , user.password )) {
      return next( 
        new AppErrors( 'Incorrect email or password' , 401 )
      )
    } 
    
    const token = generateToken( user._id )

    return res.status(200).json({
      status: 'success' ,
      token
    })
  
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


exports.protect = async ( req , res , next ) => {
  let token;
  try {
    // Get token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
    }

    if(!token) {
      return next( new AppErrors(
        `Please don't forget to login to your account , thanks` , 401
      ))
    }
    // Verify token
    const decoded = await promisify(jwt.verify)( token , process.env.JWT_SECRET )
    
    // User exists ?
    const currentU = await UserModel.findById( decoded.id )
    
    if(!currentU) return next( new AppErrors(`User does not longer exists` , 401 ))

    // User changed pass after JWT was issued ?
    if(currentU.changedPassAt( decoded.iat )) {
      return next(
        new AppErrors( 'User recently changed password , please login again' , 401)
      )
    }
    // Pass current logged in user forward
    req.user = currentU 

    // Grant Access
    next();
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


exports.restrictTo = ( ...args ) => async ( req, res, next ) => {
  try {
    if(!args.includes(req.user.role)) return next(
      new AppErrors(`Sorry , need authorization for this operation` , 403)
    )
    next();
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


exports.forgotPass = async ( req , res , next) => {
  let user;
  try {
    // Get user
    user = await UserModel.findOne({ email: req.body.email })
    if(!user){
      return next( new AppErrors('User not found' , 404 ))
    }
    // Generate token
    const resetToken = user.createTokenForPassReset();
    await user.save({validateBeforeSave: false});
    
    // Send it to user's email
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPass/${resetToken}`
    const message = `Forgot your password? Please follow the next link: ${resetURL}\nIf you didn't forget your password , please ignore this email`

    try {
      await sendEmail({
        email: user.email ,
        subject: 'Reset Password' ,
        message
      })
  
      return res.status(200).json({
        status: 'success' ,
        message: 'Token sent by email'
      })  
    } 
    catch (error) {
      user.tokenForPasswordReset= undefined ,
      user.tokenForPasswordResetExpires= undefined
      await user.save({validateBeforeSave: false});
    }
  } 
  catch (error) {
    return res.status(500).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


exports.resetPass = ( req, res , next) => {

}
const { promisify } = require('util')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//Global Errors Handler
const AppError = require('../utils/ErrorHandler');


exports.signup = async ( req , res , next ) => {
  try {
    const nueUser = await User.create({
      name: req.body.name ,
      email: req.body.email ,
      password: req.body.password ,
      passwordConfirm: req.body.passwordConfirm
    });
    const token = jwt.sign(
      { id: nueUser._id} , 
      process.env.JWT_SECRET ,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return res.status(201).json({
      status: 'success',
      token ,
      data: nueUser
    })  
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
    if( !user ||!correct ) {
      return next( new AppError('Sorry , user not found' , 404 ))
    }
    // Send token
    const token = jwt.sign(
      { id: user._id} , 
      process.env.JWT_SECRET ,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    return res.status(200).json({
      token
    })
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
    console.log(decoded);
    
    // User exists ?
    

    // User changed password after JWT issued ?

    
    
    next();
  } 
  catch (error) {
    res.status(500).json({ msg: error.message })
  }
} 
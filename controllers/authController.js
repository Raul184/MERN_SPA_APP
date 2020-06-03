const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs')
const UserModel = require('./../models/users');
const AppErrors = require('./../utils/AppErrors');

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



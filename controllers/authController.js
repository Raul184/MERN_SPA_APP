const jwt = require('jsonwebtoken');
const UserModel = require('./../models/users');

exports.signup = async ( req , res , next ) => {
  try {
    const newUser = await UserModel.create({
      name: req.body.name ,
      email: req.body.email ,
      password: req.body.password ,
      passwordConfirm: req.body.passwordConfirm
    })  

    console.log(process.env.JWT_SECRET  , process.env.JWT_SECRET_EXPIRES);
    
    const token = jwt.sign(
      { id: newUser._id } , 
      process.env.JWT_SECRET ,
      { expiresIn: process.env.JWT_SECRET_EXPIRES }
    )
    
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
    
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}
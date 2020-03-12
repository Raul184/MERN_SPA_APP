const User = require('../models/user');
const jwt = require('jsonwebtoken');

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


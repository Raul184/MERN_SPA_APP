const User = require('../models/user');

exports.signup = async ( req , res , next ) => {
  try {
    const nueUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: nueUser
    })  
  } 
  catch (error) {
    return res.status(400).json({ msg: error.message })
  }
}
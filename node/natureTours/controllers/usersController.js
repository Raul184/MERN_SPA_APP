const User = require('../models/user');

// @Route           / 
// @Description     Get all tours
// @Access          Public
exports.getAllUsers = async ( req , res ) => {
  try {
    const users = await User.find();
 
    return res.status(200).json({
      results: users.length ,
      data: users
    })  
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

// @Route           /:id 
// @Description     Get 1 tours
// @Access          Public
exports.getUser = ( req, res ) => {
  res.status(202).json({
    
  })
}

// @Route           /:id 
// @Description     Update user
// @Access          Public
exports.updateUser = (req , res ) => {
  res.status(202).json({
    
  })
}

// @Route           /:id 
// @Description     Delete user
// @Access          Public
exports.deleteUser = ( req , res ) => {
  res.status(202).json({
    
  })
}




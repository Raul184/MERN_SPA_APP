const User = require('../models/user');
const AppError = require('../utils/ErrorHandler');
const filterObj = require('../utils/tools.js')


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


// @Route           /updateMe
// @Description     Patch => Update user account data
// @Access          Private
exports.updateMe = async ( req , res , next ) => {
  try {
    // User try to update password ? => send error
    if(req.body.password || req.body.passwordConfirm ){
      return next(
        new AppError('Update just your profile , no password' , 400)
      )
    }
    
    // Filter fields NOT to be updated => password , role...
    const filterBody = filterObj( req.body , 'name' , 'email')
    
    // Update user document 
    // findByIdAndUpdate => No need password-validation in this case
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id ,
      filterBody ,
      { 
        new: true ,
        runValidators: true // if invalid mail address ==> mongo let me know
      }
    )

    return res.status(200).json({
      status: 'success' ,
      data: {
        user: updatedUser
      } 
    })
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}

// @Route           /deleteMe
// @Description     Delete => account
// @Access          Private
exports.deleteMe = async ( req , res , next ) => {
  try {
    await User.findByIdAndUpdate( req.user._id , { active: false })

    return res.status(200).json({
      status: 'success' ,
      data: null
    });
  } 
  catch (error) {
    return res.status(500).json({ msg: error.message })
  }
}
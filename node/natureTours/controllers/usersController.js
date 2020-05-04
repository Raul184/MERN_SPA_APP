const UserModel = require('../models/user');
const AppError = require('../utils/ErrorHandler');
const filterObj = require('../utils/tools.js')
const factory = require('./factory');

// @Route           / 
// @Description     Get all tours
// @Access          Public
exports.getAllUsers = factory.getAllOnes( UserModel );

// @Route           /:id 
// @Description     Get 1 tours
// @Access          Public
exports.getUser = factory.getOne( UserModel );

// @Route           /:id 
// @Description     Update user
// @Access          NOT to UPDATE PASSWORDS
exports.updateUser = factory.updateOne( UserModel );

// @Route           /:id 
// @Description     Delete user
// @Access          Admin
exports.deleteUser = factory.deleteOne( UserModel );


// __________________________________OWN PROFILE USER ROUTING __________________________________
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
    // account deactivated => not deleted
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
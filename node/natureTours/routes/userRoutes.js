//Router
const express = require('express');
const router= express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const { getAllUsers , getUser , updateUser , deleteUser , updateMe , deleteMe } = usersController;
const { signup , logIn , forgotPassword , resetPassword , protect , updatePassword } = authController;


// SignUP Users
router.post( '/signup' , signup )

// Login User
router.post( '/login' , logIn )

// Forgot Password
router.post('/forgotPassword' , forgotPassword )

// Reset Password
router.patch('/resetPassword/:token' , resetPassword )

router.patch(
  '/updateMyPassword' , 
  protect , 
  updatePassword 
)

router.patch(
  '/updateMe' , 
  protect , 
  updateMe
)

router.delete(
  '/deleteMe' ,
  protect ,
  deleteMe
)

// REST
router.get('/' , getAllUsers);
router.get('/:id' , getUser);
router.get('/:id' , updateUser);
router.get('/:id' , deleteUser);

module.exports = router;
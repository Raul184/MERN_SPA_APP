//Router
const express = require('express');
const router= express.Router();
// Controllers
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const { getAllUsers , getUser , updateUser , deleteUser , getMe , updateMe , deleteMe } = usersController;
const { signup , logIn , forgotPassword , resetPassword , protect , restrictTo , updatePassword } = authController;

// ______________________________ AUTH => Public ______________________________________
// SignUP Users
router.post( '/signup' , signup )

// Login User
router.post( '/login' , logIn )

// Forgot Password
router.post('/forgotPassword' , forgotPassword )

// Reset Password
router.patch('/resetPassword/:token' , resetPassword )


// Middleware applied by Sequence
// ALL Routes Below are Protected 
router.use(protect); 

router.patch(
  '/updateMyPassword' ,  
  updatePassword 
)

// ______________________________ USER'S PROFILE own Updates on current session ______________________________________
// ***1
router.get( '/me' ,  getMe , getUser )
router.patch( '/updateMe' , updateMe )
router.delete( '/deleteMe' , deleteMe )

// ______________________________ REST for Admin-Only______________________________________

router.use( restrictTo( 'admin' ))
router.get('/' , getAllUsers);
router.get('/:id' , getUser);
router.patch('/:id' , updateUser);
router.delete('/:id' , deleteUser);




module.exports = router;
//Router
const express = require('express');
const router= express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const { getAllUsers , getUser , updateUser , deleteUser } = usersController;
const { signup , logIn } = authController;


// SignUP Users
router.post( '/signup' , signup )

// Login User
 router.post( '/login' , logIn )

// REST
router.get('/' , getAllUsers);
router.get('/:id' , getUser);
router.get('/:id' , updateUser);
router.get('/:id' , deleteUser);


module.exports = router;
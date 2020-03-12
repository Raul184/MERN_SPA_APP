//Router
const express = require('express');
const router= express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const { getAllUsers , getUser , updateUser , deleteUser } = usersController;
const { signup } = authController;


// SignUP Users
router.post( '/signup' , signup )

// Login User
 

router.get('/' , getAllUsers);
router.get('/:id' , getUser);
router.get('/:id' , updateUser);
router.get('/:id' , deleteUser);


module.exports = router;
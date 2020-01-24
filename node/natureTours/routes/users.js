//Router
const express = require('express');
const router= express.Router();
const usersController = require('../controllers/usersController');
const { getAllUsers , getUser , updateUser , deleteUser } = usersController;



router.get('/' , getAllUsers);
router.get('/:id' , getUser);
router.get('/:id' , updateUser);
router.get('/:id' , deleteUser);


module.exports = router;
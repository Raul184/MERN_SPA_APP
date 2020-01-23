const fs = require('fs');
//Router
const express = require('express');
const router= express.Router();

// @Route           / 
// @Description     Get all tours
// @Access          Public
const getAllUsers = ( req , res ) => {
  res.status(202).json({

  })
}

// @Route           /:id 
// @Description     Get 1 tours
// @Access          Public
const getUser = ( req, res ) => {
  res.status(202).json({
    
  })
}

// @Route           /:id 
// @Description     Update user
// @Access          Public
const updateUser = (req , res ) => {
  res.status(202).json({
    
  })
}

// @Route           /:id 
// @Description     Delete user
// @Access          Public
const deleteUser = ( req , res ) => {
  res.status(202).json({
    
  })
}



router.get('/' , getAllUsers);
router.get('/:id' , getUser);
router.get('/:id' , updateUser);
router.get('/:id' , deleteUser);


module.exports = router;
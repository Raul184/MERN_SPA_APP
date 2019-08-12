const express = require('express');
const { getPosts , createPost} = require('../controllers/post');

//Resp y Req handlers
const router = express.Router();

//Req
router.get('/' , getPosts)
//Resp
router.post('/post', createPost)
module.exports = {
	router
}


const Post = require('../models/post');
//////////////////////////////////////
//////////////////////////////////////
//Controllers for Response
getPosts = (req, res) => {
	res.json({"text": "bravo"});
};

//////////////////////////////////////
//////////////////////////////////////
//Controllers for Post Request
createPost = (res, req) => {
	const post = new Post(req.body);
	console.log("Creating a post: " ,post);
}


module.exports = {
	getPosts,
	createPost
}


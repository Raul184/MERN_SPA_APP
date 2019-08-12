//ODM  >> Object Document Mapper which allows me to design MongoDB collections strongly typed and organized
const mongoose = require('mongoose');


//Define how I want my collection to be storaged in DB
const PostSchema = new mongoose.Schema({
	title: String,
	description: String,
	content: String
});

//Model and name
const Post = mongoose.model('Post', PostSchema);


//Export Model from DB
module.exports = Post;


//Simple Mongoose example
const mongoose = require('mongoose');
//Mongo Db
const MongoClient = require('mongodb').MongoClient;
//Designed schema
const Post = require('./database/models/Post');

// If DB does not exist , Mongo will create it

const client = new MongoClient(
	'mongodb://localhost/node-js-test-blog',
	{ useNewUrlParser: true }
);

//Add into our DB
Post.create({
	title: "My first post",
	description: "this is the first interaction I got with a MongoDB",
	content: "test data"
}, (error, post) => {
	console.log(error , post);
});


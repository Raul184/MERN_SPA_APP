const path = require('path');

const express = require('express');

//Views templating
const expressEdge = require('express-edge');

//SET DB Connection
const mongoose = require('mongoose');

//Set express js
const app = new express();

mongoose.connect('mongodb://localhost/node-js-blog')

// + Functionality added
app.use(express.static('public'));

// + Functionality added >> expressEdge 
app.use(expressEdge);

//dir for expressEdge
app.set("views", `${ __dirname }/views`); //**** 


//Routes
app.get('/', (req, res) => {
	//without ExpressEdge
	// res.sendFile(path.resolve(__dirname, 'pages/index.html'))	
	//ExpressEdge
	res.render('index');  //**** 
});

//about
app.get('/about', (req, res) => {
	res.render('about')	
});

//post
app.get('/post', (req, res) => {
	res.render('post')	
});

//post
app.get('/contact', (req, res) => {
	res.render('contact')	
});


app.listen(3500, () => {
	console.log("Server listening on port 3500");
});
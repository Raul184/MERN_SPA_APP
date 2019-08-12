//////////////////////////////////////////////////
// Import / Export
//////////////////////////////////////////////////
const express = require('express');
const fs = require('fs');
//ES6
// import sum from "./helpers.js";

//Node
// const helpers = require("./helpers");
const { sum , decrease } = require("./helpers");

const total = sum(10, 20);

console.log(total);

//Executing JS file from node
// console.log('being executed from Node bro');


//////////////////////////////////////////////////
//Processes 
//////////////////////////////////////////////////
// console.log('Process: ', process);


//////////////////////////////////////////////////
// NODE CORE MODULES (The Node Server)
//////////////////////////////////////////////////

// const http = require('http');

// //LOCAL Server
// const server = http.createServer((req, resp) => {
// 	resp.end("hello world from node, updated! , nodemon now updating bra");
// });
// //npm i nodemon

// server.listen(3500);
////////////////////////////////////////////////////
//EXPRESS
///////////////////////////////////////////////////

// //express app => up and running , ready to listen for requests
// const app = express(); 

// app.get('/', (req, res) => {
// 	res.send("ey wassap from Express");
// });

// app.listen(3500);


///////////////////////////////////////////////////
//NODE JS 
//					EVENT LOOP
///////////////////////////////////////////////////
const http = require('http');
const file = require('./home.html');


http.createServer((req, res) => {
	console.log(req.url);

	if (req.url === 'home') {
		return res.send(data);
	} else {
		res.send('404');
	}

}).listen(3500);




//Synchronous Task
const data = fs.readFileSync('./home.html');

console.log('Synchronous' ,data.toString());

console.log('N async programming');

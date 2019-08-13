//express
const express = require('express');
const router = express.Router();

//Request Handlers

//Requests/ => routes handlers

//1
router.get('/', (req, res, next) => {
	console.log('Server up && running');
	res.send('hello bro');
})

//2
router.get('/json', (req, res, next) => {
	const data = {
		"greeting": "hello JSON"
	}
	res.send(data.greeting);
})

//3
router.get('/home', (req, res, next) => {
	res.render('home' , null)
})



module.exports = router;
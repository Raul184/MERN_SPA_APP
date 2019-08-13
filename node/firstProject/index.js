//Express frame 
const express = require('express');
const path = require('path');

const app = express();

//TEMPLATING ENGINES (to inject data into them and render it Dinamically)
//FIND THE TEMPLATES
app.set('views', path.join(__dirname, 'views'));   //TO BE CHECKED path.join
//Specify the templating Engine
app.set('view engine', 'mustache');
//Specify hoga middleware needed by The Mustache templating engine
app.engine('mustache', require('hogan-middleware').__express);

//STATIC ASSETS DIR
app.use(express.static(path.resolve(__dirname, 'public')));

//Requests/ => routes handlers

// //1
// app.get('/', (req, res, next) => {
// 	console.log('Server up && running');
// 	res.send('hello bro');
// })

// //2
// app.get('/json', (req, res, next) => {
// 	const data = {
// 		"greeting": "hello JSON"
// 	}
// 	res.send(data.greeting);
// })

// //3
// app.get('/home', (req, res, next) => {
// 	res.render('home' , null)
// })

const indexRouter = require('./routes/index');

//Dedicated routes file to handle requests
app.use('/', indexRouter);
app.listen(3500);

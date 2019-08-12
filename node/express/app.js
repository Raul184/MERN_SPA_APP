//absolute path
const path = require('path');
const express = require('express');

const app = express();

//Assets
app.use(express.static('public'));

//Routes
//1
app.get("/", (req, resp) => {
	resp.sendFile(path.resolve(__dirname, 'home.html'));
});

//2 
app.get("/about", (req, resp) => {
	resp.sendFile(path.resolve(__dirname, "about.html"));
});

//Server
app.listen(3500, () => {
	console.log("Server running at port 3500");
});




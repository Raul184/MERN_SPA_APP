//Express
const express = require('express');
const app = express();
//Mongo Db
const MongoClient = require('mongodb').MongoClient;
//Morgan
const morgan = require('morgan');
const {router} = require("./routes/post");
//body parser
const bodyParser = require('body-parser');
// DB	---------
const uri = "mongodb+srv://Rrchaos:56474782563868Dnd111@usersdb-uuc75.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
	const collection = client.db("sample_training").collection("companies");
	console.log('DB connected');
  // perform actions on the collection object
  client.close();
});
// --------------------

//middleware 		====> DO SOMETHING IN BETWEET    A  =====> B
app.use(morgan("dev"));
// --------------------
app.use(bodyParser.json());
//Routes Requests [ AN IMPORT ]
app.use("/", router );
// --------------------

const port = 3500;
app.listen(port, () => console.log('a node JS API is listen in port: 3500'));
//--------------
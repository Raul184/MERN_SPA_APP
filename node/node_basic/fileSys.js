
//FILE SYSTEM IN NODE JS

const fs = require('fs');

// fs.watch('./target.txt', () => {
// 	console.log('file changed');
// });

//Asynchronous Task
fs.readFile('./targetAsync.txt',
	(err, data) => {
		if (err) errorHandler(err)
		dataHandler(data);
	}
);

//Synchronous Task
const data = fs.readFileSync('./home.html');

console.log('Synchronous' ,data.toString());

console.log('N async programming');


//FUNCTIONAL APPROACH
function errorHandler(err) {
	console.log(err);
}

function dataHandler(data) {
	console.log(data.toString());
}


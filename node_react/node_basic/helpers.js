//Functions 
function sum(a, b) {
	return a + b;
}

const decrease = (a, b) => a - b;


//Obj to export/import in Node
module.exports = {
	sum,
	decrease
}; 

console.log('Process :', process);
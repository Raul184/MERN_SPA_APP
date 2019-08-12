const mongoose = require('mongoose');

//POST REQUEST FEATURES
const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: "Title is required",
		minL: 4,
		maxL: 100
	},
	body: {
		type: String,
		required: "Body is required",
		minL: 4,
		maxL: 2000
	}
});

module.exports = mongoose.model("Post", postSchema);
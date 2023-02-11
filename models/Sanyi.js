const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const sanyiSchema = new mongoose.Schema({
	title: {
		type: String
	},
	description: {
		type: String
	}
});

module.exports = mongoose.model('Sanyi', sanyiSchema);
	
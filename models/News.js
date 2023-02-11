const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const newsSchema = new mongoose.Schema({
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	date: {
		type: Date
	},
	type: {
		type: String
	},
	description: {
		type: String
	},
	text: {
		type: String
	},
	og_image_content: {
		type: String
	}
	
});


module.exports = mongoose.model('News', newsSchema);
	
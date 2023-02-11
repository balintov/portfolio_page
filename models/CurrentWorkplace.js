const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const currentworkplaceSchema = new mongoose.Schema({
		name: String,
		startingDate: Number,
		jobtitle: String,
		job: Array
});

module.exports = mongoose.model('currentWorkplace', currentworkplaceSchema);
	
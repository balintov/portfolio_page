const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const previousWorkplacesSchema = new mongoose.Schema({
		name: String,
		startingDate: Number,
		endDate: Number,
		jobtitle: String,
		job: Array
});

module.exports = mongoose.model('previousWorkplaces', previousWorkplacesSchema);
	
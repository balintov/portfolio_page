const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const curriculumYearsSchema = new mongoose.Schema({
	happened: {
		type: Array
	},
	year: {
		type: Number
	}
});

module.exports = mongoose.model('CurriculumYears', curriculumYearsSchema);
	
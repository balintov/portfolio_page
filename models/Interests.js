const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const interestsSchema = new mongoose.Schema({
	"interest": String,
		"accent": String
});

module.exports = mongoose.model('Interests', interestsSchema);
	
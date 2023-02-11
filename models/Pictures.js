const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const picturesSchema = new mongoose.Schema({
	title: {
		type: String
	},
	picturesSource: {
		type: Array
	},
	picturesAlt: {
		type: Array
	}
	
});

module.exports = mongoose.model('Pictures', picturesSchema);
	
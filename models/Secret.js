var mongoose = require('mongoose');

mongoose.model('Secret', new mongoose.Schema({
	keyper_key: String,
	app: String,
	key: String
}));
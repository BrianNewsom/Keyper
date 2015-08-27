var mongoose = require('mongoose');

mongoose.model('Secret', new mongoose.Schema({key: String}));
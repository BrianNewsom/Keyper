// File to be used in npm, accesses all data.
var rest = require('restler');
var _ = require('underscore');
var config = require('./config/config');

var url = config.url();
var secretURL = url + '/secret'

var Keyper = {};

Keyper.get = function(keyperKey, cb) {
	// Return all secrets associated w/ given keyperKey
	var queryURL = secretURL + '/' + keyperKey

	rest.get(queryURL).on('complete', function(result) {
		cb(result);
	})
	.on('error', function(err){
		console.log(err)
	})
}

Keyper.add = function(keyperKey, app, key, cb) {
	var queryURL = secretURL + '/add/' + keyperKey + '/' + app + '?key=' + key;
	
	rest.post(queryURL)
		.on('complete', function(result) {
			cb(result);
		})
		.on('error', function(err){
			console.log(err);
		})
}



module.exports = Keyper;

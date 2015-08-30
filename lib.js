// File to be used in npm, accesses all data.

var protocol = 'http';
var ip = '104.131.31.144';
var port = '3000';
var url = protocol + '://' + ip + ':' + port;
var secretURL = url + '/secret'

var rest = require('restler');
var _ = require('underscore');

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


/*
Keyper.add('12345', 'google', 'this_is_a_google_key', function(res){
	console.log(res);
})

Keyper.get('12345', function(data){
	console.log(data);
})
*/

module.exports = Keyper;

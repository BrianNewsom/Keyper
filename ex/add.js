// Adding a key to Keyper using lib
keyper = require('../lib');

// get keyper key from environment variables, or default to 12345
var keyperKey = process.env['KEYPER_KEY'] || '12345';
var app = 'google';
var key = 'this_is_a_google_key';

keyper.add(keyperKey, app, key, function(res){
	console.log(res);
})

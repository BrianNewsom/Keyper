var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'),
		winston = require('winston'); 

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/add/:keyperKey/:app')
		//Add a secret
		.post(function(req, res, next) {
		  winston.info('POST ' + req.url); 
			var keyperKey = req.params.keyperKey;
			var app = req.params.app;
			var key = req.query.key;
			console.log(key)
			mongoose.model('Secret').create({keyper_key: keyperKey, app: app, key: key}, function(err, secret){
				res.json('posted key=' + key + ' for application=' + app);
			})
		})
		.get(function(req, res, next) {
			winston.info('GET ' + req.url);
			res.json('Please make a post request...');
		})

router.route('/:keyperKey')
    //GET all secrets
    .get(function(req, res, next) {
			winston.info('GET ' + req.url);
			var keyperKey = req.params.keyperKey;
			mongoose.model('Secret').find({keyper_key: keyperKey}, function(err, secrets){
				
				res.json(transform(secrets));
			})
		})

function transform(secrets) {
	// We want our data as an object formatted around application for an individual key
	var out = {};
	// For safe access verify we have data
	if (secrets[0]) {
	// Store keyper credentials just in case
		out['keyper'] = secrets[0].keyper_key;
		for (var i in secrets) {
			s = secrets[i];
			out[s.app] = s.key;
		}
	}
	return out
}

module.exports = router;
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

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
			var keyperKey = req.params.keyperKey;
			var app = req.params.app;
			var key = req.query.key;
			console.log(key)
			mongoose.model('Secret').create({keyper_key: keyperKey, app: app, key: key}, function(err, secret){
				res.json('posted key=' + key + ' for application=' + app);
			})
		})
		.get(function(req, res, next) {
			res.json('Please make a post request...');
		})

router.route('/:keyperKey')
    //GET all secrets
    .get(function(req, res, next) {
			var keyperKey = req.params.keyperKey;
			mongoose.model('Secret').find({keyper_key: keyperKey}, function(err, secrets){
				res.json(secrets);
			})
		})


module.exports = router;
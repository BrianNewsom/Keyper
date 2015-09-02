var express = require('express'),
	router = express.Router(),
	winston = require('winston');

router.route('/')
	.get(function(req, res, next) {
		winston.info('GET HOUSEPARTY ' + req.originalUrl);
		res.render('index');
	})

module.exports = router;

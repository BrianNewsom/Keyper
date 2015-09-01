var express = require('express'),
	router = express.Router(),
	winston = require('winston');

router.route('*')
	.get(function(req, res, next) {
		res.json('No endpoint was found, please see documentation or contact Brian.Newsom@Colorado.edu...');
		winston.warn('Unmatched Route: GET ' + req.originalUrl);
	})

module.exports = router;

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override'); //used to manipulate POST
var winston = require('winston');
var config = require('./config/config');
var db = require('./config/db');

var app = express();
var port = config.port;
var router = express.Router();
var secrets = require('./routes/secret');
var other = require('./routes/other');
var secret = require('./models/Secret');

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect('mongodb://' + db.host + '/' + db.name, options);
	winston.info('Connected to db successfully');
};

connect();

mongoose.connection.on('error', winston.error);
mongoose.connection.on('disconnected', connect);

app.use('/secret', secrets);
app.use('*', other); 

// Catch all unhandled routes
app.listen(port);
winston.info('Express app started on port ' + port);

/**
 * Expose
 */

module.exports = app;

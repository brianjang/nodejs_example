var mongoose = require('mongoose');
var config = require('../config/config');

var url = config.database.url + config.database.port + config.database.db;
console.log('db url %s ', url);
var promise = mongoose.connect(url, {useMongoClient: true,});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

exports.db = db;
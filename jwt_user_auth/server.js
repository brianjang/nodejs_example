'use strict';

var express = require('express');
var jsonwebtoken = require('jsonwebtoken');
var config = require('./config/config');
var bodyParser = require('body-parser');
var app = express();
// var mongooseDb = require('./database/mongoose_db');
var logger = require('morgan');
var privateKey = config.key.privateKey;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(function(req, res, next) {
  if (req.headers && req.headers.incoauth && req.headers.incoauth.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.incoauth.split(' ')[1], privateKey, function(err, decode) {
      if (err) {
        console.log('JWT decode fail : token check JWT token middleware');
        req.user = undefined;
      }
      req.user = decode;
      next();
    });
  } else {
    console.log('NO JWT token check JWT token middleware');

    req.user = undefined;
    next();
  }
});

// add router
require('./user/user.server.routes')(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

var port = config.server.port;
app.listen(process.env.PORT || port, function() {
  console.log('JWT app listening on %d port!', port);
});
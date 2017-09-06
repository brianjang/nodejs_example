var async = require('async');
bcrypt = require('bcrypt');
var config = require('../config/config');
var jwt = require('jsonwebtoken');
var User = require('../user/user.server.model').User;
var privateKey = config.key.privateKey;

exports.signup = function(req, res) {
  async.waterfall([
    function(callback) {
      console.log('signin req.body');
      console.log(req.body);

      req.body.password = bcrypt.hashSync(req.body.password, 10);
      User.saveUser(req.body, function(err, user) {
        if (!err) {
          callback(null, user);
        } else {
          if(err.name == 'ValidationError'){
            let error = {}
            error.statusCode = 409
            error.message = `the provided email is already taken, please user another email`
            callback(error, null);
          }
          else {
            let error = {}
            error.statusCode = 500
            error.message = `Oh uh, something went wrong`
            callback(error, null);// HTTP 403
          }
        }
      })
    },
    function(user_info, callback) {
      var tokenData = {
        username: user_info.username,
        id: user_info._id
      }
      callback(null, jwt.sign(tokenData, privateKey));
    }
    ],
    function(err, result) {
      if(err){
        if(err.statusCode) return res.status(err.statusCode).send(err.message);
        else return res.status(500).send(`Oh uh, something went wrong`);
      }
      else{
        return res.json({token: result});
      }
    });
}

exports.signin = function(req, res) {
  async.waterfall([
    function(callback) {
      var query = {};
      query.username = req.body.username;
      User.findUser(query, function(err, user) {
        if (err) {
          let error = {}
          console.log('err---------------');
          console.log(err);
          error.statusCode = 500;
          error.msg = `Oh uh, something went wrong`;
          callback(error, null);
        } else if (user == null){
          let error = {}
          error.statusCode = 422;
          error.message = `Email not recognised`;
          callback(error, null);
        } else {
          if (!user.comparePassword(req.body.password)) {
            let error = {}
            error.statusCode = 401;
            error.message = `Authentication failed. Invalid password.`;
            callback(error, null);
          } else {
            callback(null, user);
          }
        }
      })
    }, 
    function(user_info, callback) {
      console.log('user_info');
      console.log(user_info);

      var tokenData = {
        username: user_info.username,
        id: user_info._id
      }

      var result = {};
      result.username = user_info.username;
      result.token = jwt.sign(tokenData, privateKey);

      callback(null, result);
    }
    ],
    function(err, result) {
      if (err) {
        if(err.statusCode) return res.status(err.statusCode).send(err.message);
        else return res.status(500).send(`RESULT : Oh uh, something went wrong`);
      } else {
        return res.json(result)
      }
    })
}

exports.profile = function(req, res) {
  return res.json({profile: 'can show your profile'});
}

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};
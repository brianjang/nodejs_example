var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoose_db = require('../database/mongoose_db').db;
var uniqueValidator = require('mongoose-unique-validator');

var User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  isVerified: {
    type: Boolean,
    default: false
  }
});

User.plugin(uniqueValidator);

User.statics = {
  saveUser: function(requestData, callback) {
      this.create(requestData, callback);
  },
  findUserUpdate: function(query, user, callback) {
      this.findOneAndUpdate(query, user, callback);
  },
  updateUser: function(user, callback) {
      user.save(callback);
  },

  findUser: function(query, callback) {
      this.findOne(query, callback);
  },

  findUserByIdAndUserName: function(id, username, callback) {
      this.findOne({ username: username, _id: id }, callback);
  }
};

User.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var user = mongoose.model('user', User);

/** export schema */
module.exports = {
  User: user
};
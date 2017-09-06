var User = require('./user.server.controller');

module.exports = function(app) {
  app.route('/signup')
    .post(User.signup)

  app.route('/signin')
    .post(User.signin)

  app.route('/profile')
    .post(User.loginRequired, User.profile)
}
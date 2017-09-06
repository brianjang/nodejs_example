var User = require('./user.server.controller');

module.exports = function(app) {
  // app.post('/signup', User.signup);
  // app.post('/signin', User.signin);
  // app.get(User.loginRequired, '/profile', User.profile);

  app.route('/signup')
    .post(User.signup)

  app.route('/signin')
    .post(User.signin)

  app.route('/profile')
    .post(User.loginRequired, User.profile)
}

// module.exports = function(app) {
//   var todoList = require('../controllers/todoListController'),
//   userHandlers = require('../controllers/userController.js');

//   // todoList Routes
//   app.route('/tasks')
//     .get(todoList.list_all_tasks)
//     .post(userHandlers.loginRequired, todoList.create_a_task);

//   app.route('/tasks/:taskId')
//     .get(todoList.read_a_task)
//     .put(todoList.update_a_task)
//     .delete(todoList.delete_a_task);

//   app.route('/auth/register')
//     .post(userHandlers.register);

//   app.route('/auth/sign_in')
//     .post(userHandlers.sign_in);
// };
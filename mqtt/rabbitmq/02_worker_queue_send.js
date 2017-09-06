// var amqp = require("amqplib/callback_api");

// amqp.connect("amqp://incowiz:incokr1!@192.168.0.5", function(err, conn) {
//   conn.createChannel(function(err, ch) {
//     var q = "amqp_queue";
//     var msg = process.argv.slice(2).join(' ') || "hello world";

//     ch.assertQueue(q, {durable: true}); // {durable: true} use task queue

//     ch.sendToQueue(q, new Buffer(msg), {persistence: true}); // {persistence: true} use task queue
//     console.log(" [X] Sent '%s' ", msg);
//   });
//   setTimeout(function() { conn.close(); process.exit(0) }, 500);
// });


var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    // var q = 'task_queue';
    var q = 'meertag';
    var msg = process.argv.slice(2).join(' ') || "Hello World!";

    ch.assertQueue(q, {durable: true});
    ch.sendToQueue(q, new Buffer(msg), {persistent: true});
    console.log(" [x] Sent '%s'", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
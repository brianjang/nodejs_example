var amqp = require("amqplib/callback_api");

// var url = "amqp://incowiz:incowiz@192.168.0.104";
var url = "amqp://localhost";

amqp.connect(url, function(err, conn) {
  if(err) {
    console.log(err);
  }

  conn.createChannel(function(err, ch) {

    var ex = "logs";
    var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, "fanout", {durable: false}); // (exchange_name, exchange_type)
    ch.publish(ex, '', new Buffer(msg)); // (exchange_name, queue_name)
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
var amqp = require('amqplib/callback_api');

// var url = "amqp://incowiz:incowiz@192.168.0.104";
var url = "amqp://localhost";

amqp.connect(url, function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
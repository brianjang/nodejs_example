var amqp = require("amqplib/callback_api");

// var url = "amqp://incowiz:incowiz@192.168.0.104";
var url = "amqp://localhost";

amqp.connect(url, function(err, conn) {

  conn.createChannel(function(err, ch) {
    var ex = "hello_ex";

    ch.assertExchange(ex, "fanout", {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);

      // ch.bindQueue(q.queue, ex, '');
      ch.bindQueue("hello", ex, '');

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString());
      }, {noAck: true});
    });

  });

});

var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error] [hello]");
  process.exit(1);
}

amqp.connect("amqp://localhost", function(err, conn) {

  conn.createChannel(function(err, ch) {
    // var ex = 'direct_logs';
    var ex = 'amq:topic';
    //assertExchange
    // var type = "direct";
    var type = "topic";
    ch.assertExchange(ex, type, {durable: false});

    // ch.bindQueue('hello', ex, '1234');

    // ch.consume('hello', function(msg) {
    //     console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
    // }, {noAck: true});

    //assertQueue
    ch.assertQueue('hello', {exclusive: true}, function(err, q) {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      args.forEach(function(severity){
        ch.bindQueue(q.queue, ex, severity);
      });

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
      }, {noAck: true});

    });
    // --> bindQueue
    // --> consume
  });
});
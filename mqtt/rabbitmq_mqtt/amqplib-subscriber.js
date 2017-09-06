// testing for mqtt plugin

var amqp = require("amqplib/callback_api");

var args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs_direct.js [info] [warning] [error] [hello]");
  process.exit(1);
}

amqp.connect("amqp://localhost", function(err, conn) {

  conn.createChannel(function(err, ch) {
    // var ex = 'direct_logs';
    var ex = 'amq.topic';
    // var type = "direct";
    var type = "topic";
    var q = "hello_amqplib";

    ch.assertExchange(ex, type, {durable: true});

    //assertQueue
    ch.assertQueue(q, {exclusive: false}, function(err, q) {
        console.log(' [*] Waiting for logs. To exit press CTRL+C : ' + q.queue);

        ch.bindQueue(q.queue, ex, 'hello', {}, function(err, ok) {
            if (err) {
                console.log(err);
            } 
        });

        ch.consume(q.queue, function(msg) {
            console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
        }, {noAck: true});

    });
    // --> bindQueue
    // --> consume
  });
});

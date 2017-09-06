var amqp = require('amqplib/callback_api');

// var url = "amqp://incowiz:incowiz@192.168.0.104";
var url = "amqp://localhost";

amqp.connect(url, function(err, conn) {
  if(err) {
        console.log("err --------------------------------------");
        console.log(err);
        console.log("--------------------------------------");
  }

  conn.createChannel(function(err, ch) {
    var q = 'hello';
    var msg = 'Hello World!';



    ch.assertQueue(q, {durable: false});
    // Note: on Node 6 Buffer.from(msg) should be used
    // ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
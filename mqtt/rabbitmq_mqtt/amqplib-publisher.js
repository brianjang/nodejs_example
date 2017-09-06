var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  publisher(conn);
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});


function publisher(conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'amq.topic';
    var args = process.argv.slice(2);
    var key = "temp.room"; // this means routing key
    
    var payload = {  
      tagId : '1234'
    };

    var msg = JSON.stringify(payload);

    ch.assertExchange(ex, 'topic', {durable: true});
    ch.publish(ex, key, new Buffer(msg));
    console.log(" [x] Sent %s:'%s'", key, msg);
  });
};
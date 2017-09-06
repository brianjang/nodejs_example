var amqp = require('amqp');  
var url  = 'amqp://localhost:5672'

var connection = amqp.createConnection({url: url }, { defaultExchangeName: 'amq.topic' });

connection.on('ready', function () {  
    connection.queue('hello_amqp', { durable: true, autoDelete: false }, function (q) {
        q.bind('hello');

        q.subscribe({ ack: true, prefetchCount: 1 }, function (message) {
            console.log('received message', message.data.toString());
            q.shift();
        });
    });
});
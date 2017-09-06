// "use strict";

// var mqtt = require("mqtt");
// var client = mqtt.connect("mqtt://localhost:1885");
// require("colors");

// function printObjKeys(obj) {
//   for (var k in obj) {
//     if (obj.hasOwnProperty(k)) {
//       console.log(k);
//     } 
//   }
// }

// function printObject(obj) {

//   return;

//   for(var k in obj) {
//     if(obj.hasOwnProperty(k)) {
//       console.log(k.bold.blue);
//       console.log(obj[k]);
//     }
//   }
// }

// client.on("connect", function(connack) {
//   console.log("mqtt_sub event connect ===========================");
//   // printObjKeys(connack);
//   // console.log(connack.cmd);
// });

// client.on("reconnect", function() {
//   console.log("mqtt_sub event reconnect ======================");
// });

// client.on("close", function() {
//   console.log("mqtt_sub event close ==============================");
// });

// client.on("offline", function() {
//   console.log("mqtt_sub event offline ==================================");
// });

// client.on("error", function(error) {
//   console.log("mqtt_sub event error ===================================");
//   console.log(error);
// });

// client.on("message", function(topic, message, packet) {
//   console.log("mqtt_sub event message ===========================".bold.red);
//   console.log(topic);
//   console.log(message.toString());
//   // console.log(packet);

//   client.publish("test", "hello mqtt from message event");
// });

// client.on("packetsend", function(packet) {
//   console.log("mqtt_sub event packetsend ======================".bold.blue);
//   console.log(packet.cmd);
//   printObject(packet);
// });

// client.on("packetreceive", function(packet) {
//   console.log("mqtt_sub event packetreceive =====================".bold.green);
//   console.log(packet.cmd);
//   printObject(packet);
// });


// // var topic = "test/#"; // https://mosquitto.org/man/mqtt-7.html
// var sub_topic = {"test": 0};
// client.subscribe("test",function (err, granted) {
//   console.log("mqtt_sub callback =============".blue);

//   if (err) {
//     console.log("mqtt_sub callback =============".red);
//     console.log(err);
//   }

//   console.log(granted);

// });

// // client.end();


// var mqtt = require('mqtt');  
// var url  = 'mqtt://localhost:1887';

// var client = mqtt.connect(url, { clientId: 'mqtt-sub-', clean: false });
// // var client = mqtt.connect(url); // no problem
// var key = 'temp/room';

// client.on('connect', function () {  
//   client.subscribe(key, { qos: 1 });
// });

// client.on('message', function (topic, message) {  
//   console.log('received message ',  message.toString());
// });

var mongoClient = require('mongodb');
var mqtt = require('mqtt');  
var url  = 'mqtt://localhost:1883';

var client = mqtt.connect(url);
// var client = mqtt.connect(url); // no problem
// var sub_topic = 'thingsuite/device';
var pub_topic = 'thingsuite/server/device'
var pub_app_topic = 'thingsuite/app'
var light_status = 0;

var env = process.env.NODE_ENV;
var url = 'mongodb://localhost/atomy_dev';
if (env === 'test') {
  url = 'mongodb://localhost/atomy_t';
}

// var mongo_db;
// mongoClient.connect(url, function(err, db) {
//   mongo_db = db;
  
// });

// client.on('connect', function () {  
//   client.subscribe(sub_topic, { qos: 1 });
// });

// client.on('message', function (topic, message) {  
//   console.log('received message ',  message.toString());
//   var jsonData = JSON.parse(message.toString());
//   // var jsonData = message.toString();
//   console.log('jsonData ',  jsonData.cmd);
//   var message = {};
//   if (light_status === 0) {
//     light_status = 1;
//   } else {
//     light_status = 0;
//   }
//   message.light = light_status;
//   console.log('message.light: ' + message.light);
//   var jsonData = JSON.stringify(message);

//   client.publish(pub_topic, jsonData);
// });


// mosquitto_sub -h onecloud.incowiz.com -t load -p 8885 -d --capath /etc/ssl/certs/
require('colors');
sub_topic = 'load';
pub_topic = 'load'
var path = require('path')
var fs = require('fs')
// var KEY = fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'helpers', 'tls-key.pem'))
// var CERT = fs.readFileSync(path.join(__dirname, '..', '..', 'test', 'helpers', 'tls-cert.pem'))
var KEY = fs.readFileSync(path.join(__dirname, '.', 'letsencrypt','privkey.pem'));
var CERT = fs.readFileSync(path.join(__dirname, '.', 'letsencrypt','cert.pem'));
// onecloud_DST_cert.cer
var PORT = 8885;
var qos = 2;
var putCnt = 200;
url = 'mqtts://onecloud.incowiz.com:8885'

var options = {
  port: PORT,
  key: KEY,
  cert: CERT,
  rejectUnauthorized: false
}

var client = mqtt.connect(url, options);

var messageCnt = 0;
client.on('message', function (topic, message) {
  // console.log('received message '.blue,  message.toString());
  ++messageCnt;

  // if (!(messageCnt % 100)) {
  //   console.log('subscribe count: ', messageCnt);  
  // }
  console.log('subscribe count: ', messageCnt);  
})

client.on('connect', function () {  
  console.log('connect ----------------------'.red);
  client.subscribe(sub_topic, { qos: qos });

  // for (var i = putCnt - 1; i >= 0; i--) {
  //   client.publish(pub_topic, "tls hello", { qos: qos });  
  // }
  
});


// var payload = {  
//   tagId : '1234'
// };

// var client = mqtt.connect(url);

// client.on('connect', function () {  
//   // hello is routing key
//   var routingKey = 'meertag';
//   client.publish(routingKey, JSON.stringify(payload), { qos: 1 }, function() {
//     client.end();
//     process.exit();
//   });
// });
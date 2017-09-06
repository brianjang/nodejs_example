"use strict";


// var mqtt = require("mqtt");
// var client = mqtt.connect("mqtt://localhost:1887");
// require("colors");

// function printObjKeys(obj) {
//   for (var k in obj) {
//     if (obj.hasOwnProperty(k)) {
//       console.log(k);
//     } 
//   }
// }

// function printObject(obj) {
//   for(var k in obj) {
//     if(obj.hasOwnProperty(k)) {
//       console.log(k.bold.blue);
//       console.log(obj[k]);
//     }
//   }
// }

// client.on("connect", function(connack) {
//   console.log("mqtt_pub event connect ===========================");
//   // printObjKeys(connack);
//   // console.log(connack.cmd);
// });

// client.on("reconnect", function() {
//   console.log("mqtt_pub event reconnect ======================");
// });

// client.on("close", function() {
//   console.log("mqtt_pub event close ==============================");
// });

// client.on("offline", function() {
//   console.log("mqtt_pub event offline ==================================");
// });

// client.on("error", function(error) {
//   console.log("mqtt_pub event error ===================================");
//   console.log(error);
// });

// client.on("message", function(topic, message, packet) {
//   console.log("mqtt_pub event message ===========================".bold.red);
//   console.log(topic);
//   console.log(message.toString());
//   // console.log(packet);
// });

// client.on("packetsend", function(packet) {
//   console.log("mqtt_pub event packetsend ======================".bold.blue);
//   console.log(packet.cmd);
//   // printObject(packet);
// });

// client.on("packetreceive", function(packet) {
//   console.log("mqtt_pub event packetreceive =====================".bold.green);
//   console.log(packet.cmd);
//   // printObject(packet);
// });

// var option = {qos: 0};
// // var topic = "meertag/12:34:56:78";
// var topic = "hello";
// client.publish(topic, "published by mqtt broker", option, function (err) {
//   console.log("mqtt_pub callback ===============".blue);
//   if (err) {
//     console.log("mqtt_pub callback error ===============".red);
//     console.log(err);
//   }
// });
// // client.end();


var mqtt = require('mqtt');  
var url  = 'mqtt://localhost:1887';

var payload = {  
  tagId : '1234'
};

var client = mqtt.connect(url);

client.on('connect', function () {  
  // hello is routing key
  client.publish('hello', JSON.stringify(payload), { qos: 1 }, function() {
    client.end();
    process.exit();
  });
});
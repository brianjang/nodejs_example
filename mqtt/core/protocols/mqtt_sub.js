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


var mqtt = require('mqtt');  
var url  = 'mqtt://localhost:1887';

var client = mqtt.connect(url, { clientId: 'mqtt-sub-', clean: false });
// var client = mqtt.connect(url); // no problem

client.on('connect', function () {  
  client.subscribe('hello', { qos: 1 });
});

client.on('message', function (topic, message) {  
  console.log('received message ',  message.toString());
});
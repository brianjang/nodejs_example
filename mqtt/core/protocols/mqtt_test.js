"use strict";

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://localhost:1885");
var redis = require("redis");
require("colors");

function printObjKeys(obj) {
  for (var k in obj) {
    if (obj.hasOwnProperty(k)) {
      console.log(k);
    } 
  }
}

function printObject(obj) {

  return;

  for(var k in obj) {
    if(obj.hasOwnProperty(k)) {
      console.log(k.bold.blue);
      console.log(obj[k]);
    }
  }
}

var redisPub;
var redisSub;
redisPub = redis.createClient(null, null, {no_ready_check: true});
redisSub = redis.createClient(null, null, {no_ready_check: true});

client.on("connect", function(connack) {
  console.log("mqtt_sub event connect ===========================");
  // printObjKeys(connack);
  // console.log(connack.cmd);

  var sub_topic = {"meertag/#": 2};
  client.subscribe(sub_topic,function (err, granted) {
    console.log("mqtt_sub callback =============".blue);

    if (err) {
      console.log("mqtt_sub callback =============".red);
      console.log(err);
    }

    console.log(granted);
    redisSub.subscribe("meertag/1234");

  });

});

client.on("reconnect", function() {
  console.log("mqtt_sub event reconnect ======================");
});

client.on("close", function() {
  console.log("mqtt_sub event close ==============================");
});

client.on("offline", function() {
  console.log("mqtt_sub event offline ==================================");
});

client.on("error", function(error) {
  console.log("mqtt_sub event error ===================================");
  console.log(error);
});

client.on("message", function(topic, message, packet) {
  console.log("mqtt_sub event message ===========================".bold.red);
  // console.log(topic);
  // console.log(message.toString());
  // console.log(packet);

  redisPub.publish(topic, message);

});

client.on("packetsend", function(packet) {
  console.log("mqtt_sub event packetsend ======================".bold.blue);
  console.log(packet.cmd);
  printObject(packet);
});

client.on("packetreceive", function(packet) {
  console.log("mqtt_sub event packetreceive =====================".bold.green);
  console.log(packet.cmd);
  printObject(packet);
});

redisSub.on('pmessage', function(pattern, channel, message) {
  console.log("####### Redis pmessage is received ppp ============================");
  client.publish(channel, message);
});

redisSub.on('message', function(pattern, channel, message) {
  console.log("####### Redis message is received ============================");
  client.publish("meertag/1234", "published by redis");
  return;
});

// var topic = "meertag/12:34:56:78";
// var topic = "meertag/#"; // https://mosquitto.org/man/mqtt-7.html
// var sub_topic = {"meertag/#": 2};
// client.subscribe(sub_topic,function (err, granted) {
//   console.log("mqtt_sub callback =============".blue);

//   if (err) {
//     console.log("mqtt_sub callback =============".red);
//     console.log(err);
//   }

//   console.log(granted);
//   client.sub.subscribe("meertag/1234");

// });

// var option = {qos: 2};
// // var topic = "meertag/12:34:56:78";
// var topic = "meertag/1234";
// client.publish(topic, "{id: 12:34:56:78, p: 010-2644-1182}", option, function (err) {
//   console.log("mqtt_pub callback ===============".blue);
//   if (err) {
//     console.log("mqtt_pub callback error ===============".red);
//     console.log(err);
//   }

//   client.pub.publish(topic, "hello redis");
// });

// client.end();
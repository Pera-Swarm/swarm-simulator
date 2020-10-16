
const mqttClient = require('mqtt');
const mqttConfig = require("../config/mqtt.config");

const mqttController = require("../mqtt/control.mqtt");
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

mqtt.on('message', (topic, message, packet) => {

   // Only look for freash messages
   if(packet.retain===false){
      console.log(topic + ": " + message);

      if(topic=="v1/controller/blower"){
         mqttController.upload(message);

      }else if(topic=="v1/controller/mist"){
         //mqttController.upload(message);

      }else if(topic=="v1/controller/irrigation"){
         //mqttController.upload(message);

      }else if(topic=="v1/controller/curtain"){
         //mqttController.upload(message);

      }else if(topic=="v1/controller/sensorStation"){
         // mqttController.upload(message);
      }
   }
});

mqtt.on('error', function(err) {
   console.log('error: mqtt');
   console.log(err);
});

exports.start = () => {
   mqtt.on('connect', () => {
      const options={qos:2, rap:true,rh:true};

      mqtt.subscribe('v1/controller/upload',options);
      mqtt.subscribe('v1/controller/log',options);

   });
}

exports.sendMsgToController = (req, callback) => {
   data = req.body;
   mqtt.publish('v1/controller/' + req.body.id, JSON.stringify(req.body), function(){
      console.log("mqtt: v1/controller/"+ req.body.id);
      callback({message:"Success"});
   });
}

exports.client = mqtt;

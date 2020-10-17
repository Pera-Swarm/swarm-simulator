
const publishOptions = {qos: 1, retain: false};  // https://www.npmjs.com/package/mqtt#publish
const subscribeOptions = {qos:2, rap:true,rh:true}; // https://www.npmjs.com/package/mqtt#subscribe

exports.subscribe = (mqtt) => {
   mqtt.subscribe('v1/sensor/distance',subscribeOptions);
   console.log("subscribed to v1/sensor/distance");
}

exports.handleTopic = (mqtt, topic, msg) => {
   
   console.log("Distance Sensor Handle the topic");
   data = JSON.parse(msg)

   if ((data.id != undefined) && (data.value != undefined)) {
      // Just echo back to the robot since no implementation yet
      this.publishToRobot(mqtt, data.id, data.value);
   }else{
      // Invalid message format
   }
}

exports.publishToRobot = (mqtt, robotId, reading) => {
   mqtt.publish('v1/sensor/distance/' + robotId.toString(), reading.toString(), publishOptions, ()=>{
      // callback
      console.log("published: robot_" + robotId + " > " + reading);
   });
}

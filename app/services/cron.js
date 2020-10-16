'use strict'

const sensorUpdate = require("../cron/sensor.update.cron.js");
var mqtt;

exports.begin = (mqtt) => {
   this.mqtt = mqtt;

   sensorUpdate.update(mqtt, 1009, 1); 

}

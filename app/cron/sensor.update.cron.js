var cron = require('node-cron');

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *

*/

module.exports.update = (mqtt, id, time) => {

   //const interval = '*/10 * * * *';  // 10 mins
   const interval = '*/2 * * * *';   // 2 min

   cron.schedule(interval, ()=>{
      console.log("mqtt: v1/controller/sensorStations");

      //mqtt.client.publish('v1/controller/' + id + '/monitor', '1');

      setTimeout(()=>{
         // Turn off
         //mqtt.client.publish('v1/controller/' + id + '/monitor', '0');
      }, time*1000);

   },{
      scheduled: true,
      timezone: "Asia/Colombo"
   });
}

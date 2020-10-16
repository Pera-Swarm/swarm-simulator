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
   const interval = '*/10 * * * * *';   // every 10 seconds

   cron.schedule(interval, ()=>{
      console.log("mqtt: v1/controller/sensorStations", id);

      mqtt.client.publish('v1/controller/' + id + '/monitor', '1');

      setTimeout(()=>{
         // Turn off
         const payload = {
             id,
             timestamp: new Date()
         }
         mqtt.client.publish('v1/controller/' + id + '/monitor', JSON.stringify(payload));
      }, time*10);

   },{
      scheduled: true,
      timezone: "Asia/Colombo"
   });
}

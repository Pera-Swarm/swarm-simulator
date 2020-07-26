const axiosConfig = require("../config/axios.config.js");
const axios = require('axios');
const api = axios.create(axiosConfig.config);

exports.upload = (body) => {
   data = JSON.parse(body);

   /*
   v1/controller/upload
   {"controllerId":1000,"blower":0,"mist":1,"irrigation":0,"curtain":0,"version":1}
   */
   api.post('/v1/controller/', {
      controllerId: data.controllerId,
      blower: data.blower,
      mist: data.mist,
      irrigation: data.irrigation,
      curtain: data.curtain,
      version: 1
   })
   .then(function (response) {
      //console.log(response.data);
      console.log("success: mqtt.control.controller.js: /v1/controllers/");
   })
   .catch(function (error) {
      console.log('error: control.sensor.controller.js: /v1/controllers/');
      console.log(error);
   });
};


exports.log = (body) => {

   data = JSON.parse(body);

   const id = data.id;
   const priority = data.p;
   const message = data.msg;

   console.log(data);

   api.post('/v1/logs/', {
      type:'CONTROLLER',
      priority:priority,
      message: id + ': ' + message
   })
   .then((res)=>{
      console.log("success: mqtt.controller.js: /v1/logs/");
   })
   .catch((err)=>{
      console.log("error: mqtt.controller.js: /v1/logs/");
      console.log(error.response.data);
   })
}

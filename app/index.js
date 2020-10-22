require('dotenv').config()

const axios = require('axios');

//const db = require("./services/database.js");

const express = require("./services/express")
const mqtt = require("./services/mqtt.js");
const cron = require("./services/cron.js");
const sensors = require("./robots/sensors.js");
const { simpleSwarmServer } = require('./modules/modes');
console.log(simpleSwarmServer);

const setupFn = () => {
    express.start()
    mqtt.start(sensors);
    cron.begin(mqtt);
    console.log('setup');
};

// function getRndInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) ) + min;
// }
// 255, 65535


const flowFn = () => {
    // console.log('flow 1');
    // console.log('flow 2');
};

simpleSwarmServer.start(setupFn, flowFn);


/*
// force:true to drop the table if it already exists
db.sequelize.sync({ alter: true }).then(() => {
   console.log("sequalize: started");
});
*/

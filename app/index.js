require('dotenv').config()

const axios = require('axios');

//const db = require("./services/database.js");

const express = require("./services/express")
const mqtt = require("./services/mqtt.js");
const cron = require("./services/cron.js");
const sensors = require("./robots/sensors.js");

express.start()
mqtt.start(sensors);
cron.begin(mqtt);

/*
// force:true to drop the table if it already exists
db.sequelize.sync({ alter: true }).then(() => {
   console.log("sequalize: started");
});
*/

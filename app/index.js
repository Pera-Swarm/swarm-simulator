require('dotenv').config();

const axios = require('axios');

//const db = require("./services/database.js");

const express = require('./services/express');
const mqtt = require('./services/mqtt.js');
const cron = require('./services/cron.js');

// This is the root module of the system. Every feature can be accessed through this object
const Robots = require('./robots/robots.js');

var robots = new Robots();

express.start();
mqtt.start(robots);
cron.begin(mqtt);

/*
// force:true to drop the table if it already exists
db.sequelize.sync({ alter: true }).then(() => {
   console.log("sequalize: started");
});
*/

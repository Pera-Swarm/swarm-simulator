require('dotenv').config();

// Set default timezone
process.env.TZ = 'Asia/Colombo';

//const axios = require('axios');
//const express = require('./services/express');
//const db = require("./services/database.js");

const { Swarm } = require('./swarm/');

// starting the swarm
const swarm = new Swarm();

//express.start();

/*
// force:true to drop the table if it already exists
db.sequelize.sync({ alter: true }).then(() => {
console.log("sequalize: started");
});
*/

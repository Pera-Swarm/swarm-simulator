require('dotenv').config();

// Set default timezone
process.env.TZ = 'Asia/Colombo';

//const express = require('./services/express');

const { Swarm } = require('./swarm/');

// starting the swarm
const swarm = new Swarm();

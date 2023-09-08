require('dotenv').config();

// Set default timezone
process.env.TZ = 'Asia/Colombo';

const { Swarm } = require('./swarm/');

// starting the swarm
const swarm = new Swarm();

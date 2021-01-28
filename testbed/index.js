const {
    obstacleController
} = require('../dist/pera-swarm/modules/obstacles/obstacleController');
const fs = require('fs');

const x = 0;
const y = 0;
const heading = 0;

const debug = true;

const wallWidth = 100;
const wallHeight = 20;
const wallDepth = 5;
const wall1_orientation = 0;
const wall2_orientation = 90;
const wallColor = '#404040';

const isObstacle = controller.isObstacleThere(heading, x, y);
const dist = controller.getDistance(heading, x, y);
const color = controller.getColor(heading, x, y);

console.log('\n\nisObstacle:', isObstacle, 'distance:', dist, 'color', color);

const jsonObstacles = controller.visualizeObstacles();

console.log(JSON.stringify(jsonObstacles));

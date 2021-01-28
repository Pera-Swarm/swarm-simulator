const {
    obstacleBuilder
} = require('../dist/pera-swarm/modules/obstacles/obstacleBuilder');
const {
    obstacleController
} = require('../dist/pera-swarm/modules/obstacles/obstacleController');
const fs = require('fs');

const x = 0;
const y = 0;
const heading = 140;

const wallWidth = 100;
const wallHeight = 20;
const wallDepth = 5;

const debug = true;

// Note: obstacleController is used for creating and managing a list of obstacles.
const controller = new obstacleController();
const w2 = controller.createWall(wallWidth, wallHeight, 0, -50, 50, wallDepth, debug);
const w3 = controller.createWall(wallWidth, wallHeight, 90, -50, -50, wallDepth, debug);

const isObstacle = controller.isObstacleThere(heading, x, y);
const dist = controller.getDistance(heading, x, y);
console.log('isObstacle:', isObstacle, 'distance:', dist);

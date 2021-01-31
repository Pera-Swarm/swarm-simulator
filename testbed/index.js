const {
    obstacleController
} = require('../dist/pera-swarm/modules/obstacles/obstacleController');
const fs = require('fs');

const x = 0;
const y = 0;
const heading = 140;

const debug = true;

const wallWidth = 100;
const wallHeight = 20;
const wallDepth = 5;
const wall1_orientation = 0;
const wall2_orientation = 90;
const wallColor = '#404040';

const cylinderRadius = 20;
const cylinderHeight = 18;
const cylinderX = -50;
const cylinderY = 40;
const cylinderColor = '#00AA00';

// Note: obstacleController is used for creating and managing a list of obstacles.
const controller = new obstacleController();

const w2 = controller.createWall(
    wallWidth,
    wallHeight,
    wall1_orientation,
    -50,
    50,
    wallDepth,
    wallColor,
    debug
);
const w3 = controller.createWall(
    wallWidth,
    wallHeight,
    wall2_orientation,
    -50,
    -50,
    wallDepth,
    wallColor,
    debug
);

const c1 = controller.createCylinder(
    cylinderRadius,
    cylinderHeight,
    cylinderX,
    cylinderY,
    cylinderColor,
    debug
);

const isObstacle = controller.isObstacleThere(heading, x, y);
const dist = controller.getDistance(heading, x, y);
const color = controller.getColor(heading, x, y);

console.log('\n\nisObstacle:', isObstacle, 'distance:', dist, 'color', color);

const jsonObstacles = controller.visualizeObstacles();

console.log(JSON.stringify(jsonObstacles));
// const { Wall } = require('../dist/wall');
// const { Cylinder } = require('../dist/cylinder');
// const { WallObstacle, CylinderObstacle } = require('../app/modules/obstacles/');
const { obstacleBuilder } = require('../dist/obstaclebuilder');
const {
    ObstacleController,
    obstacleList,
    obstacleController
} = require('../dist/obstacleController');

const wallWidth = 100;
const wallX = -50;
const wallY = 50;
const wallOrietation = 45;

const x = 0;
const y = 0;
const heading = 85;

// id, width, height, orientation, originX, originY, debug = false
const obs = new WallObstacle(1, wallWidth, 20, wallOrietation, wallX,wallY, true);

const range = obs.isInRange(heading, x, y, 5);
const ans = obs.getDistance(heading, x, y);

console.log(range, ans);


/*
// For cylinder obstacle

const radius = 10;
const height = 20;
const depth = 5;
const orientation = 0;
const radius = 10;
const originX = 15;
const originY = 15;
const debug = true;

// Note: obstacleBuilder is used for creating individual obstacles seperately.
const builder = obstacleBuilder();

// radius,height, originX, originY, debug = false
// const c = new CylinderObstacle(1, radius, height, originX, originY, true);
// const c = new Cylinder(radius, height, originX, originY, true);
const c1 = builder.createCylinder(radius, height, originX, originY, true);

const range = c1.isInRange(heading, x, y, 5);
const ans = c1.getDistance(heading, x, y);

console.log(range, ans);

// width, height, orientation, originX, originY, depth, debug=false
// const wall1 = new WallObstacle(1, 100,20, 0, -50, 50, true);
// const ans = wall1.isInRange(0, 0, 0);
// const w = new Wall(100, 20, 0, -50, -50, depth, true);
const w1 = builder.createWall(width, height, orientation, originX, originY, depth, debug);
const range2 = w1.isInRange(heading, x, y, 5);
const ans2 = w1.getDistance(heading, x, y);

console.log(range2, ans2);
// console.log(w.isInRange(0, 0, 0));
// console.log(w.center);

builder.changeMaterial(w1, 'MeshMaterial');
// console.log([w.visualize(), c.visualize()]);
// console.log(c.visualize());
// console.log(w.visualize());

// Note: obstacleController is used for creating and managing a list of obstacles.
// const controller = new ObstacleController();
const controller = obstacleController();
const c2 = controller.createCylinder(100, 20, 0, -50, -50, depth, true);
const w2 = controller.createWall(100, 20, 0, -50, -50, depth, true);
// console.log(controller.findObstaclesByType('Cylinder'));
// console.log(controller.findObstaclesByType('Wall'));
console.log(controller.visualizeObstacles());


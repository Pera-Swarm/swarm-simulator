const { WallObstacle, CylinderObstacle } = require('../app/modules/obstacles/');
const { Cylinder } = require('../staging/cylinder');
const { Wall } = require('../staging/wall');

const x = 40;
const y = 40;
const heading = 180 + 45;

const width = 100;
const height = 20;
const depth = 5;
const radius = 10;
const originX = 15;
const originY = 15;

// id, radius,height, originX, originY, debug = false
// const c = new CylinderObstacle(1, radius, height, originX, originY, true);
const c = new Cylinder(radius, height, originX, originY, true);

const range = c.isInRange(heading, x, y, 5);
const ans = c.getDistance(heading, x, y);

console.log(range, ans);
// console.log(c.visualize());

/**
 * 
Cylinder obstacle created
radius: 10 height: 20
p: { x: 15, y: 15 }

Calculated Angle: -135, deltaT: 16.427713126242697
heading: -135 CCW: -113.57 CW: -156.43
true 25.36
 */

//const wall1 = new WallObstacle(1, 100,20, 0, -50, 50, true);
//const ans = wall1.isInRange(0, 0, 0);
// width, height, orientation, originX, originY, depth, debug=false
const w = new Wall(100, 20, 0, -50, -50, depth, true);
const range2 = w.isInRange(heading, x, y, 5);
const ans2 = w.getDistance(heading, x, y);

console.log(range2, ans2);
// console.log(w.isInRange(0, 0, 0));
// console.log(w.center);
// console.log(w.visualize());

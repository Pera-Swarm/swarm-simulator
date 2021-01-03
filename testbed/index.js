const { WallObstacle, CylinderObstacle } = require('../app/modules/obstacles/');

const width = 100;
const x = 0;
const y = 0;
const heading = 90;

//const wall1 = new WallObstacle(1, 100,20, 0, -50, 50, true);
//const ans = wall1.isInRange(0, 0, 0);
/*
const radius = 10;
const height = 20;
const originX = 15;
const originY = 15;

id, radius,height, originX, originY, debug = false
const c = new CylinderObstacle(1, radius, height, originX, originY, true);
*/

// id, width, height, orientation, originX, originY, debug = false
const obs = new WallObstacle(1, 100, 20, 0, -50, 50, true);

const range = obs.isInRange(heading, x, y, 5);
const ans = obs.getDistance(heading, x, y);

console.log(range, ans);

const { WallObstacle, CylinderObstacle } = require('../app/modules/obstacles/');

const wallWidth = 100;
const wallX = -50;
const wallY = 50;
const wallOrietation = 0;

const x = 0;
const y = 0;
const heading = 90;

// id, width, height, orientation, originX, originY, debug = false
const obs = new WallObstacle(1, wallWidth, 20, wallOrietation, wallX,wallY, true);

const range = obs.isInRange(heading, x, y, 5);
const ans = obs.getDistance(heading, x, y);

console.log(range, ans);

/*
// For cylinder obstacle

const radius = 10;
const height = 20;
const originX = 15;
const originY = 15;

id, radius,height, originX, originY, debug = false
const c = new CylinderObstacle(1, radius, height, originX, originY, true);

const range = obs.isInRange(heading, x, y, 5);
const ans = obs.getDistance(heading, x, y);

console.log(range, ans);

*/

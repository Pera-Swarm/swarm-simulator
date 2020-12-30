const { WallObstacle } = require('../app/modules/obstacles/');

// width,depth, orientation, originX, originY, debug=false

const width = 100;

const wall1 = new WallObstacle(1, 100,20, 0, -50, 50, true);

const ans = wall1.isInRange(0, 0, 0);
console.log(ans);

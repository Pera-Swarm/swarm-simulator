const { WallObstacle } = require('../app/modules/obstacles/');

// width, orientation, originX, originY, debug=false
const wall1 = new WallObstacle(100, 0, -50, 50, true);

const ans = wall1.isInRange(0, 0, 0);
console.log(ans);

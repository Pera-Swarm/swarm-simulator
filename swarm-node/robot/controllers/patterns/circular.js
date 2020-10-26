const logger = require('../../../logger/winston');

const R = 50;
var a = 0;
var delta = 2;

function move(x, y, heading) {
    console.log(x, y, heading);
}

const circular = (robot, callback) => {
    logger.log('debug', 'controllers.patterns.circular: ', robot.getCoordinates());
    heading = 180 - a;
    x = R * Math.cos((a * Math.PI) / 180);
    y = R * Math.sin((a * Math.PI) / 180);
    a = a + delta;
    //if(a > 180) a = a-180;
    //heading = (heading + 180) % 180

    robot.setCoordinates(heading, x, y);
    callback();
    logger.log('debug', 'controllers.patterns.circular: ', robot.getCoordinates());
};

module.exports = {
    circular
};

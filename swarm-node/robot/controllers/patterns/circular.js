const logger = require('../../../logger/winston');

const R = 50;
var a = 0;
var delta = 2;

function move(x, y, heading) {
    console.log(x, y, heading);
}

function normalizedAngle(a){
    b = (a+180)%360
    if(b<=0) b+= 360
    b = b-180
    return b;
}

const circular = (robot, callback) => {
    logger.log('debug', 'controllers.patterns.circular: ', robot.getCoordinates());

    //heading = 180 - a;
    heading = normalizedAngle(180 - a); // Need to test this
    x = R * Math.cos((a * Math.PI) / 180);
    y = R * Math.sin((a * Math.PI) / 180);

    robot.setCoordinates(heading, x, y);
    a = a + delta;

    callback();
    logger.log('debug', 'controllers.patterns.circular: ', robot.getCoordinates());
};

module.exports = {
    circular
};

const logger = require('../../../logger/winston');

function setHeading(heading) {
    var { x, y } = robot.getCoordinates();
    robot.setCoordinates(heading, x, y);
}

function move(robot, d) {
    var { x, y, heading } = robot.getCoordinates();

    x = x + d * Math.cos((heading * Math.PI) / 180);
    y = y + d * Math.sin((heading * Math.PI) / 180);
    if (Math.abs(x) > 140 || Math.abs(y) > 140) {
        const turn = 180 + (Math.random() * 90 - 45);
        heading = Math.round(normalizedAngle(heading + turn) * 10) / 10;
    }
    console.log(x.toFixed(2), y.toFixed(2), heading);

    robot.setCoordinates(heading, x, y);
}

function normalizedAngle(a) {
    b = (a + 180) % 360;
    if (b <= 0) b += 360;
    b = b - 180;
    return b;
}

const linear = (robot, callback) => {
    //logger.log('debug', 'controllers.patterns.linear: ', robot.getCoordinates());
    move(robot, 30);

    callback();
};

module.exports = {
    linear
};

const logger = require('../../../logger/winston');

function move(robot, d) {
    var { x, y, heading } = robot.getCoordinates();

    x = x + d * Math.cos((heading * Math.PI) / 180);
    y = y + d * Math.sin((heading * Math.PI) / 180);

    x = Math.round(x * 100) / 100;
    y = Math.round(y * 100) / 100;

    if (Math.abs(x) > 140 || Math.abs(y) > 140) {
        const turn = 180 + ((Math.random() * 120)- 60);
        heading = Math.round(normalizedAngle(heading + turn) * 10) / 10;
    }
    console.log(x, y, heading);

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

const logger = require('../../../logger/winston');

/**
 * method move with increment by one for each axis
 * @param coordinates
 */
const move = (coordinates) => {
    var { head, x, y } = coordinates;
    logger.info('robot.controllers.motor.move: coordinates(%s)', coordinates);
    coordinates = {
        head: head + 1,
        x: x + 1,
        y: y + 1
    };
    return coordinates;
}

/**
 * method moveSpecific with increment by given value for each axis
 * @param coordinates
 * @param x
 * @param y
 */
const moveSpecific = (coordinates, x, y) => {
    var { head, x, y } = coordinates;
    logger.info('robot.controllers.motor.moveSpecific: coordinates(%s)', coordinates);
    coordinates = {
        head: head + 1,
        x: x + 1,
        y: y + 1
    };
    return coordinates;
}

/**
 * method stop
 * @param coordinates
 */
const stop = (coordinates) => {
    // does not change coordinates
    logger.info('robot.controllers.motor.stop: coordinates(%s)', coordinates);
    return coordinates;
}

/**
 * method reset
 * @param coordinates
 */
const reset = (coordinates) => {
    // reset coordinates to initial values
    coordinates = {
        head: 0,
        x: 0,
        y: 0
    };
    logger.info('robot.controllers.motor.reset: coordinates(%s)', coordinates);
    return coordinates;
}

module.exports = {
    move,
    moveSpecific,
    stop,
    reset
}

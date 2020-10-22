const motorController = require('../../robot/controllers/motor/index');
const logger = require('../../logger/winston');

const move = (coordinates) => {
    logger.info('services.motor.move: coordinates(%s)', coordinates);
    return motorController.move(coordinates);
};

const moveSpecific = (coordinates) => {
    logger.info('services.motor.moveSpecific: coordinates(%s)', coordinates);
    return motorController.moveSpecific(coordinates, 2, 2);
};

const stop = (coordinates) => {
    logger.info('services.motor.stop: coordinates(%s)', coordinates);
    return motorController.stop(coordinates);
};

const reset = (coordinates) => {
    logger.info('services.motor.reset: coordinates(%s)', coordinates);
    return motorController.reset(coordinates);
};

module.exports = {
    move,
    moveSpecific,
    stop,
    reset
};

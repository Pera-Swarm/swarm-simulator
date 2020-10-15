const motorController = require('../../robot/controllers/motor/index');

const move = (coordinates) => {
    return motorController.move(coordinates);
}

const moveSpecific = (coordinates) => {
    return motorController.moveSpecific(coordinates, 2, 2);
}

const stop = (coordinates) => {
    return motorController.stop(coordinates);
}

const reset = (coordinates) => {
    return motorController.reset(coordinates);
}

module.exports = {
    move,
    moveSpecific,
    stop,
    reset
}

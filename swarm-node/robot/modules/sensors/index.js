// const colorSensor = require('./color/index');
// const compassSensor = require('./compass/index');
// const proximitySensor = require('./proximity/index');
const DistanceSensor = require('./distance/');
const logger = require('../../../logger/winston');

class Sensors {
    constructor() {
        this.distanceSensor = new DistanceSensor();
        logger.log('debug', 'robot.modules.sensors: Initial Sensor');
    }
}

module.exports = Sensors;

const logger = require('../../../../logger/winston');

class DistanceSensor {
    
    constructor() {
        this.value = 0;
        logger.log('debug', 'robot.modules.sensors.distance: Initial DistanceSensor');
    }

    /**
     * Get distance
     */
    getValue = () => {
        logger.log('debug', 'robot.modules.sensors.distance: getValue()');
        return this.value;
    }

    /**
     * Set distance
     * @param {value} distance_value
     */
    setValue = (value) => {
        logger.log('debug', 'robot.modules.sensors.distance: setValue(%s)', value);
        this.value = value;
    }
}

module.exports = DistanceSensor;

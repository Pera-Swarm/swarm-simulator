const { DistanceSensor } = require('./distance/');
const { ColorSensor } = require('./color/');

/**
 * method for creating the sensor array
 * @param {number} id robot id
 */
var sensors = (id) => {
    return {
        color: new ColorSensor(id),
        distance: new DistanceSensor(id),
        updated: new Date()
    };
};

module.exports = sensors;

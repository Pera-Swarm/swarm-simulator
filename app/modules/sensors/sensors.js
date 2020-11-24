const { ColorSensor } = require('./lib/color/');
const { DistanceSensor } = require('./lib/distance');

/**
 * method for creating the sensor array
 * @param {number} id robot id
 */
const sensors = (id) => {
    if (id === undefined) throw new TypeError('id unspecified');
    return {
        color: new ColorSensor(id),
        distance: new DistanceSensor(id),
        updated: new Date()
    };
};

module.exports = sensors;

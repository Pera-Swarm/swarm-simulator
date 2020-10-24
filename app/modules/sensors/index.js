const { DistanceSensor } = require('./distance/');
const { ColorSensor } = require('./color/');

var sensors = (id) => {
    return {
        color: new ColorSensor(id),
        distance: new DistanceSensor(id),
        updated: new Date()
    };
};

module.exports = sensors;

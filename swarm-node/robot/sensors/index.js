const colorSensor = require('./color/index');
const compassSensor = require('./compass/index');
const distanceSensor = require('./distance/index');
const proximitySensor = require('./proximity/index');

module.exports.robot = {
    colorSensor,
    compassSensor,
    distanceSensor,
    proximitySensor
}

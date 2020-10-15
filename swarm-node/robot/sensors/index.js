const colorSensor = require('./color/index');
const compassSensor = require('./compass/index');
const distanceSensor = require('./distance/index');
const proximitySensor = require('./proximity/index');

console.log('Robot instance');

module.exports.robot = {
    colorSensor,
    compassSensor,
    distanceSensor,
    proximitySensor
}

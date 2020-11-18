const { DistanceSensor } = require('./lib/distance/');
const { ColorSensor } = require('./lib/color/');
const sensors = require('./sensors');

module.exports = { DistanceSensor, ColorSensor, sensors };

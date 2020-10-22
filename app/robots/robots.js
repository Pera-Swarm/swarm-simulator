// link internal modules like this way
const SimpleLocalizationSystem = require('../modules/localization/simple');

var loc_system;

class Robots {
    constructor() {
        this.loc_system = new SimpleLocalizationSystem();
    }

    // attach external modules like this way to the robot
    sensors = require('./sensors.js');
}

module.exports = Robots;

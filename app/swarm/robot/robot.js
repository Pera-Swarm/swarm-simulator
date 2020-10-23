const { Coordinate } = require('../../common/coordinate');
const sensors = require('../../modules/sensors');

class Robot {
    constructor(id) {
        this.id = id;
        this.coordinate = new Coordinate(id, 0, 0, 0);
        this.sensors = sensors(id);
        this.created = new Date();
        this.updated = Date.now();
        this.timestamp = Date.now();
    }

    // TODO: add robot specific functionalities here
}

module.exports = { Robot };

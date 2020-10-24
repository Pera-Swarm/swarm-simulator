const { Coordinate } = require('../../common/coordinate');
const sensors = require('../../modules/sensors');

class Robot {
    constructor(id, x, y, heading) {
        this.id = id;

        x = x == undefined ? 0 : x;
        y = y == undefined ? 0 : y;
        heading = heading == undefined ? 0 : heading;

        console.log('Created > id:', id, 'x:', x, 'y:', y, 'heading', heading);

        this.coordinate = new Coordinate(id, x, y, heading);
        this.sensors = sensors(id);
        this.created = new Date();
        this.updated = Date.now();
        this.timestamp = Date.now();
    }

    // TODO: add robot specific functionalities here
}

module.exports = { Robot };

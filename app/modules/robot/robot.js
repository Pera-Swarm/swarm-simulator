const { Coordinate } = require('../../common/coordinate');
const sensors = require('../../modules/sensors');

const sensorTypes = ['color', 'distance'];

// Class for representing the specific robot level functionality
class Robot {
    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    constructor(id, x, y, heading, z) {
        this.id = id;

        heading = heading == undefined ? 0 : heading;
        x = x == undefined ? 0 : x;
        y = y == undefined ? 0 : y;
        if (z !== undefined) {
            this.z = z;
        }

        // console.log('Robot_Created > id:', id, 'x:', x, 'y:', y, 'heading', heading);

        this.coordinate = new Coordinate(id, x, y, heading);
        this.sensors = sensors(id);
        this.created = new Date();
        this.updated = new Date();
        this.timestamp = Date.now();
    }

    /**
     * method for getting coordinates
     */
    getCoordinates = () => {
        // if z coordinates are declared, return the extended cooridnates
        if (this.z !== undefined) {
            return this.coordinate.getCoordinatesEx();
        }
        return this.coordinate.getCoordinates();
    };

    setCoordinates = (x, y, heading) => {
        // if z coordinates are declared, return the extended cooridnates
        this.coordinate.setCoordinates(x, y, heading);
        return true;
    };

    /**
     * method for setting coordinates
     * if z is given, the z coordinate is updated only if the z coordinate is assigned to an initial value at the instance creation only.
     * if not, only the other coordinates are updated accordingly
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    setCoordinates = (x, y, heading, z) => {
        if (this.coordinate.z !== undefined && z !== undefined) {
            this.coordinate.setCoordinates(x, y, heading, z);
        } else {
            this.coordinate.setCoordinates(x, y, heading);
        }
    };

    /**
     * method for getting all the sensor readings
     */
    getSensorReadings = () => {
        var result = {};

        for (const key in this.sensors) {
            if (this.sensors.hasOwnProperty(key)) {
                if (sensorTypes.includes(key)) {
                    result[key] = this.sensors[key].getReading();
                }
            }
        }

        return result;
    };

    /**
     * method for getting the sensor readings by the given sensor type
     * @param {string} type sensor type
     */
    getReadingsBySensor = (type) => {
        return this.sensors[type].getReading();
    };

    /**
     * method for updating the heartbeat of the robot
     */
    updateHeartbeat = () => {
        //console.log('Heartbeat updated')

        this.updated = new Date();
        return this.updated;
    };
}

module.exports = { Robot, sensorTypes };

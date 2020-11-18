const { Coordinate } = require('../../common/coordinate');
const { sensors } = require('../../modules/sensors');

const sensorTypes = ['color', 'distance'];

/**
 * @class Robot Representation
 * @classdesc representing the specific robot level functionality
 */
class Robot {
    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    constructor(id, heading, x, y, z) {
        this.id = id;
        heading = heading === undefined ? 0 : heading;
        x = x === undefined ? 0 : x;
        y = y === undefined ? 0 : y;
        if (z !== undefined) {
            this.z = z;
        }
        this.coordinate = new Coordinate(id, heading, x, y);
        this.sensors = sensors(id);
        this.created = new Date();
        this.updated = Date.now();
        this.timestamp = Date.now();
    }

    /**
     * method for getting coordinates
     * @returns coordinate object : if z coordinates exists, extended coordinates are returned
     */
    getCoordinates = () => {
        // if z coordinates are declared, return the extended cooridnates
        if (this.z !== undefined) {
            return this.coordinate.getCoordinatesEx();
        }
        return this.coordinate.getCoordinates();
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
    setCoordinates = (heading, x, y, z) => {
        if (this.coordinate.z !== undefined && z !== undefined) {
            this.coordinate.setCoordinates(heading, x, y, z);
        } else {
            this.coordinate.setCoordinates(heading, x, y);
        }
    };

    /**
     * method for getting all the sensor readings
     * @returns {object} all sensor readings with sensor type as the key and readings as the value
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
     * @returns {object} sensor reading object
     */
    getReadingsBySensor = (type) => {
        if (typeof type === 'string') {
            return this.sensors[type].getReading();
        } else {
            throw new TypeError('invalid sensor type');
        }
    };

    /**
     * method for updating the heartbeat of the robot
     * @returns {Date} updated datetime value
     */
    updateHeartbeat = () => {
        this.updated = Date.now();
        return this.updated;
    };

    /**
     * method for return the live status of the robot
     * @returns {Boolean} live or dead
     */
    isAlive = (interval) => {
        const seconds = Math.floor((Date.now() - this.updated) / 1000);
        return seconds <= interval;
    };
}

module.exports = { Robot, sensorTypes };

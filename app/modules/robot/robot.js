const { Coordinate } = require('../../common/coordinate');

//const { sensors } = require('../../modules/sensors');
//const sensorTypes = ['color', 'distance'];

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
        if (z !== undefined) this.z = z;

        this.coordinate = new Coordinate(id, heading, x, y);
        this.created = Date();
        this.updated = Date.now();
        this.timestamp = Date.now();

        // This is to keep the customized data in the robot object
        this.data = [];
    }

    /**
     * method for get a data by its key
     * @param {number} key key for the data
     * @returns {Object} the data object : if it exists
     * @returns undefined : if it doesn't exist
     */
    getData = (key) => {
        if (key === undefined) throw new TypeError('key unspecified');
        return this.data[key];
    };

    /**
     * method for set a data by its key
     * @param {number} key key for the data object
     * @param {Object} the data object
     * @returns true
     */
    setData = (key, value) => {
        if (key === undefined) throw new TypeError('key unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        this.data[key] = value;
        return true;
    };

    /**
     * method for getting coordinates
     * @returns coordinate object : if z coordinates exists, extended coordinates are returned
     */
    getCoordinates = () => {
        // if z coordinates are declared, return the extended cooridnates
        if (this.z !== undefined) return this.coordinate.getCoordinatesEx();
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

        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this.updated = Date.now();
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
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @returns {boolean} true : if the robot is counted as 'alive'
     * @returns false : if the robot is counted as 'dead'
     */
    isAlive = (interval) => {
        if (interval === undefined) throw new TypeError('interval unspecified');
        const seconds = Math.floor((Date.now() - this.updated) / 1000);
        return seconds <= interval;
    };
}

module.exports = { Robot };

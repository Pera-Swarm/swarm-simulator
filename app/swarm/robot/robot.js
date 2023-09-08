const { AbstractCoordinateRobot, Coordinate, CoordinateValueInt } = require('pera-swarm');
const { Reality } = require('pera-swarm');

/**
 * @class Robot Representation
 * @classdesc representing the specific robot level functionality in the Swarm Server
 */
class Robot extends AbstractCoordinateRobot {
    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    constructor(id, heading = 0, x = 0, y = 0, reality = Reality.V) {
        super(id, new Coordinate(id, heading, x, y));

        // Robot status details
        this.created = new Date();
        this.timestamp = Date.now();
        this.reality = reality;

        // This is to keep the customized data in the robot object
        this._data = [];
    }

    /**
     * Method for getting last updated time
     * @returns {string} time in hh:mm:ss format
     */
    get lastUpdate() {
        const d = new Date(this._updated);
        const hour = d.getHours().toString().padStart(2, '0');
        const minute = d.getMinutes().toString().padStart(2, '0');
        const second = d.getSeconds().toString().padStart(2, '0');

        return `${hour}:${minute}:${second}`;
    }

    /**
     * Method for getting coordinates
     * @returns {TCoordinate} coordinate
     */
    get coordinates() {
        return this._coordinates.values;
    }

    /**
     * Method for getting data
     * @returns {any[]} robot's stored data
     */
    get data() {
        return this._data;
    }

    /**
     * Method for getting the reality of the robot,
     * @returns {Reality} robot's reality
     */
    get reality() {
        return this._reality;
    }

    /**
     * Method for setting the reality of the robot
     * @param {Reality} reality reality of the robot
     */
    set reality(reality) {
        this._reality = reality;
    }

    /**
     * Method for get a data by its key
     * @param {number} key key for the data
     * @returns {Object} the data object : if it exists
     * @returns undefined : if it doesn't exist
     */
    getData = (key) => {
        if (key === undefined) throw new TypeError('key unspecified');
        return this._data[key];
    };

    /**
     * Method for set a data by its key
     * @param {number} key key for the data object
     * @param {Object} the data object
     * @returns true
     */
    setData = (key, value) => {
        if (key === undefined) throw new TypeError('key unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        this._data[key] = value;
        return true;
    };

    /**
     * Method for getting coordinates
     * @returns {TCoordinate} coordinate values
     */
    getCoordinates = () => {
        return this._coordinates.values;
    };

    /**
     * Method for getting coordinates
     * @returns coordinate values, with only 2 decimals
     */
    getCoordinatesPretty = () => {
        const x = Math.round(this._coordinates.values.x * 100) / 100;
        const y = Math.round(this._coordinates.values.y * 100) / 100;
        const heading = Math.round(this._coordinates.values.heading * 100) / 100;
        return { x, y, heading };
    };
    /**
     * Method for setting coordinates
     * @param {CoordinateValueInt<number>} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinates = (coordinate) => {
        const { heading, x, y } = coordinate;
        this._coordinates.setCoordinates(heading, x, y);
        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this._updated = Date.now();
    };

    /**
     * Method for setting coordinates
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinateValues = (heading, x, y) => {
        this._coordinates.setCoordinates(heading, x, y);
        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this._updated = Date.now();
    };

    /**
     * Method for updating the heartbeat of the robot
     * @returns {string} updated datetime value
     */
    updateHeartbeat = () => {
        this._updated = Date.now();
        return this._updated;
    };

    /**
     * Method for return the live status of the robot
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @returns {boolean} true : if the robot is counted as 'alive'
     * @returns {boolean} false : if the robot is counted as 'dead'
     */
    isAlive = (interval) => {
        if (interval === undefined) throw new TypeError('interval unspecified');
        const seconds = Math.floor((Date.now() - this.updated) / 1000);
        return seconds <= interval;
    };
}

module.exports = {
    Robot
};

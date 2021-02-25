const { AbstractCoordinateRobot, Coordinate, CoordinateValueInt } = require('pera-swarm');

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
    constructor(id, heading = 0, x = 0, y = 0, reality = 'V') {
        super(id, new Coordinate(id, heading, x, y));

        // Robot status details
        this.created = new Date();
        this.timestamp = Date.now();

        //console.log(reality);
        this.reality = reality;

        // This is to keep the customized data in the robot object
        this._data = [];
    }

    /**
     * method for getting last updated time
     */
    get lastUpdate() {
        const d = new Date(this._updated);
        // TODO: add padding '0's and properly format the code
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }

    /**
     * method for getting coordinates
     */
    get coordinates() {
        return this._coordinates.values;
    }

    /**
     * method for getting data
     */
    get data() {
        return this._data;
    }

    /**
     * method for getting the reality of the robot, 'R' | 'V'
     */
    get reality() {
        return this._reality;
    }

    /**
     * method for setting the reality of the robot, 'R' | 'V'
     */
    set reality(reality) {
        this._reality = reality;
    }

    /**
     * method for get a data by its key
     * @param {number} key key for the data
     * @returns {Object} the data object : if it exists
     * @returns undefined : if it doesn't exist
     */
    getData = (key) => {
        if (key === undefined) throw new TypeError('key unspecified');
        return this._data[key];
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
        this._data[key] = value;
        return true;
    };

    /**
     * method for getting coordinates
     * @returns coordinate values
     */
    getCoordinates = () => {
        return this._coordinates.values;
    };

    /**
     * method for getting coordinates
     * @returns coordinate values, with only 2 decimals
     */
    getCoordinatesPretty = () => {
        const x = Math.round(this._coordinates.values.x * 100) / 100;
        const y = Math.round(this._coordinates.values.y * 100) / 100;
        const heading = Math.round(this._coordinates.values.heading * 100) / 100;
        return { x, y, heading };
    };
    /**
     * method for setting coordinates
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
     * method for setting coordinates
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
     * method for updating the heartbeat of the robot
     * @returns {number} updated datetime value
     */
    updateHeartbeat = () => {
        this._updated = Date.now();
        return this._updated;
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

module.exports = {
    Robot
};

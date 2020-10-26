const robot = require('../../modules/robot/');
const { Robot } = require('../../modules/robot/');

// Class for representing the robots level functionality
class Robots {
    /**
     * Robots constructor
     */
    constructor() {
        this.list = {};
        this.size = 0;
        this.updated = Date.now();
    }

    /**
     * method for adding a robot to the list
     * @param {number} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    addRobot = (id, heading, x, y, z) => {
        if (id === undefined) {
            throw new TypeError('id unspecified');
        }
        if (this.findRobotById(id) === -1) {
            // id not found
            if (heading === undefined) {
                this.list[id] = new Robot(id);
            }
            if (z === undefined) {
                this.list[id] = new Robot(id, heading, x, y);
            } else if (z !== undefined) {
                this.list[id] = new Robot(id, heading, x, y, z);
            }
            this.size += 1;
            return;
        } else {
            // id found
            // TODO: neglecting adding a new robot with an existing id for now
            return;
        }
    };

    /**
     * method for finding the robot by id
     * return the robot instance if it exists
     * return -1 if it doesn't exist
     * @param {number} id robot id
     */
    findRobotById = (id) => {
        var result = -1;
        for (const key in this.list) {
            if (
                Object.prototype.hasOwnProperty.call(this.list, key) &&
                key === id.toString()
            ) {
                result = this.list[key];
            }
        }
        return result;
    };

    /**
     * method for getting the size of the robot list
     */
    getSize = () => {
        return this.size;
    };

    // TODO: add swarm functionality here
    // updateRobot
    // removeRobot
    // getSensorReadings
    // getCoordinates
    // checkAlive
    // invalidateRobot
    // registerRobot
    // stopRobot
    // resetRobot
    // Note: add any other functions
}

const initRobots = () => {
    return new Robots();
};

module.exports = {
    Robots,
    initRobots
};

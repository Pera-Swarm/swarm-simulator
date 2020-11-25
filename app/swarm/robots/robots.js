const robot = require('../../modules/robot/');
const { Robot } = require('../../modules/robot/');
const { Coordinate } = require('../../common/coordinate');

// Class for representing the robots level functionality

class Robots {
    /**
     * Robots constructor
     */
    constructor() {
        this.robotList = {};
        this.size = 0;
        this.updated = Date.now();
    }

    /**
     * method for adding a robot to the robotList
     * @param {number} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate, optional
     * @returns {number} id : if successful
     */
    addRobot = (id, heading, x, y, z) => {
        if (id === undefined) throw new TypeError('id unspecified');

        // only add a robot if the id doesn't exist
        if (this.existsRobot(id) === false) {
            // robot doesn't exists
            if (heading === undefined) {
                this.robotList[id] = new Robot(id);
            }
            if (z === undefined) {
                this.robotList[id] = new Robot(id, heading, x, y);
            } else if (z !== undefined) {
                this.robotList[id] = new Robot(id, heading, x, y, z);
            }
            this.size += 1;
            this.updated = Date.now();
            return id;
        }
    };

    /**
     * method for getting the size of the robot robotList
     * @returns {number} the size of the robot instances : are in the list
     */
    getSize = () => {
        return this.size;
    };

    /**
     * method for finding a robot exists in the robotList or not
     * @param {number} id robot id
     * @returns {boolean} true : if it exists with the id
     * @returns false : if a robot doesn't exist with the id
     */

    createIfNotExists = (id) => {
        if (this.existsRobot(id) == false) {
            // robot doesn't exists
            this.robotList[id] = new Robot(id);
        }
    };

    existsRobot = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');
        return this.robotList[id] != undefined;
    };

    /**
     * method for finding a robot exists in the robotList or not
     * @param {number} id robot id
     * @returns {boolean} true : if robot is alive
     * @returns false : if a robot doesn't exist with the id
     */
    isAliveRobot = (id, interval) => {
        if (id === undefined) throw new TypeError('id unspecified');
        if (interval === undefined) throw new TypeError('interval unspecified');

        return this.robotList[id].isAlive(interval);
    };

    /**
     * method for finding the robot by id
     * @param {number} id robot id
     * @returns {Robot|number} the robot instance : if it exists
     * @returns -1 : if it doesn't exist
     */
    findRobotById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        var result = this.robotList[id];
        if (result == undefined) return -1;
        return result;
    };

    /**
     * method for removing the robot by id
     * @param {number} id robot id
     * @param {function} callback a callback function
     * @returns {boolean} true : if successful
     * @returns false : if it fails
     */
    removeRobot = (id, callback) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id)) {
            // remove the key along with the value.
            delete this.robotList[id];
            this.size -= 1;
            this.updated = Date.now();
            if (callback !== undefined) {
                callback(id);
            }
            return true;
        }
        return false;
    };

    /**
     * method for getting the robot coordinates by id
     * @param {number} id robot id
     * @returns {Coordinate|number} the robot coordinates : if it exists
     * @returns -1 : if it doesn't exist
     */
    getCoordinatesById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id) === false) return -1;
        return this.findRobotById(id).getCoordinates();
    };

    /**
     * method for getting the robot coordinate string by id
     * @param {number} id robot id
     * @returns {String|number} the robot coordinate string : if it exists
     * @returns -1 : if it doesn't exist
     */
    getCoordinateStringById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id) === false) return -1;

        const { x, y, heading } = this.findRobotById(id).getCoordinates();
        return `${x} ${y} ${heading}`;
    };

    /**
     * method for getting the coordinates of all robots
     * @returns {Coordinate[]} current robot coordinates : that are existing in the list
     */
    getCoordinatesAll = () => {
        var result = [];
        for (const key in this.robotList) {
            result.push(this.robotList[key].getCoordinates());
        }
        return result;
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {Coordinate[]} coordinates coordinate data
     */
    updateCoordinates = (coordinates) => {
        if (coordinates === undefined) throw new TypeError('coordinates unspecified');

        coordinates.forEach((item) => {
            const { id, x, y, heading } = item;
            if (this.existsRobot(id)) {
                this.findRobotById(id).setCoordinates(heading, x, y);
            } else {
                this.addRobot(id, heading, x, y);
            }
            this.updated = Date.now();
        });
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @param {function} callback a callback function. 'id' will be given as a parameter
     */
    prune = (interval, callback) => {
        if (interval === undefined) throw new TypeError('interval unspecified');
        for (var id in this.robotList) {
            if (this.isAliveRobot(id, interval) == false) {
                // console.log('Robot_Removed', id);
                this.removeRobot(id, callback);
            }
        }
    };

    // TODO: add swarm functionality here
    // getSensorReadings
    // registerRobot
    // stopRobot
    // resetRobot
    // Note: add any other functions

    compAngle = (a, b, c) => {
        return a < b && b <= c;
    };
    getDistance = (id, callback) => {
        if (id === undefined) throw new TypeError('id unspecified');

        const xMin = -150;
        const xMax = 150;
        const yMin = -150;
        const yMax = 150;

        const { x, y, heading } = this.findRobotById(id).getCoordinates();

        var p1 = { x: xMin, y: yMin }; // upper left
        var p2 = { x: xMax, y: yMax }; // upper right
        var p3 = { x: xMin, y: yMin }; // lower left
        var p4 = { x: xMax, y: yMin }; // lower right

        var angle1 = (Math.atan2(p1.y - y, p1.x - x) * 180) / Math.PI;
        var angle2 = (Math.atan2(p2.y - y, p2.x - x) * 180) / Math.PI;
        var angle3 = (Math.atan2(p3.y - y, p3.x - x) * 180) / Math.PI;
        var angle4 = (Math.atan2(p3.y - y, p3.x - x) * 180) / Math.PI;

        console.log('Distance');
        console.log('Ang:', angle1, angle2, angle3, angle4);

        if (this.compAngle(angle1, heading, 0) || this.compAngle(angle2, heading, 0)) {
            console.log('line1');
        } else if (this.compAngle(angle4, heading, angle2)) {
            console.log('line2');
        } else if (
            this.compAngle(angle3, heading, 180) ||
            this.compAngle(-180, heading, angle4)
        ) {
            console.log('line3');
        } else if (this.compAngle(angle1, heading, angle3)) {
            console.log('line4');
        }
    };
}

/**
 * method for initializing the robot class
 * @return {Robots} return the initialized Robots object
 */
const initRobots = () => {
    return new Robots();
};

module.exports = {
    Robots,
    initRobots
};

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
            return id;
        }
    };

    /**
     * method for getting the size of the robot robotList
     * @returns {number} the size of the robot instances are in the list
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

        //console.log(id, this.robotList[id].isAlive(interval));
        return this.robotList[id].isAlive(interval);
    };
    /**
     * method for finding the robot by id
     * @param {number} id robot id
     * @returns {Robot|number} the robot instance if it exists
     * @returns -1 if it doesn't exist
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
     */
    removeRobot = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id)) {
            // remove the key along with the value.
            delete this.robotList[id];
            this.size -= 1;

            // Request from GUI to remove the robot
            // TODO: Implement this @Ganindu
            //swarm.publish('v1/localization/delete',{'id':id});

            return true;
        }
        return false;
    };

    /**
     * method for getting the robot coordinates by id
     * @param {number} id robot id
     * @returns {Coordinate|number} the robot coordinates if it exists
     * @returns -1 if it doesn't exist
     */
    getCoordinatesById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id) === false) return -1;
        return this.findRobotById(id).getCoordinates();
    };

    /**
     * method for getting the robot coordinate string by id
     * @param {number} id robot id
     * @returns {String|number} the robot coordinate string if it exists
     * @returns -1 if it doesn't exist
     */
    getCoordinateStringById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id) === false) return -1;

        const { x, y, heading } = this.findRobotById(id).getCoordinates();
        return `${x} ${y} ${heading}`;
    };

    /**
     * method for getting the coordinates of all robots
     * @returns {Coordinate[]} return the current robot coordinates that are existing in the list
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

        // console.log('before', this.getCoordinatesAll());
        // TODO: Array validate, coordinate object validate
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
     * @param {number} interval the maximum allowed time for update the heartbeat pulse
     */
    checkAlive = (interval) => {
        for (var id in this.robotList) {
            if (this.isAliveRobot(id, interval) == false) {
                console.log('Robot_Removed', id);
                this.removeRobot(id);
            }
        }
    };

    // TODO: add swarm functionality here
    // getSensorReadings
    // invalidateRobot
    // registerRobot
    // stopRobot
    // resetRobot
    // Note: add any other functions
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

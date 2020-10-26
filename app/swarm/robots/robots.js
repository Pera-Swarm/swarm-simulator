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
    * @param {number} x x coordinate
    * @param {number} y y coordinate
    * @param {number} heading heading coordinate
    * @param {number} z z coordinate, optional
    */
    addRobot = (id, x, y, heading, z) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id) == false) {
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
    * method for removing the robot by id
    * return the robot instance if it exists
    * return -1 if it doesn't exist
    * @param {number} id robot id
    */
    removeRobot = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.existsRobot(id)) {
            this.list[id] = undefined;
            this.size -= 1;
        }
    };

    /**
    * method for finding the robot by id
    * return the robot instance if it exists
    * return -1 if it doesn't exist
    * @param {number} id robot id
    */
    existsRobot = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');
        return this.robotList[id] != undefined;
    };

    /**
    * method for finding the robot by id
    * return the robot instance if it exists
    * return -1 if it doesn't exist
    * @param {number} id robot id
    */
    findRobotById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');
        var result = this.list[id];

        if (result != undefined) {
            return result;
        } else {
            // TODO: Any better option than this ?
            return -1;
        }
        return result;

    };

    /**
    * method for updating the coordinates of the given robot list
    * @param {data}  [{id,x,y,heading}},]
    */
    locationUpdate = (data) => {
        console.log('Robot_locationUpdate:');
        data.forEach((robot, i) => {
            const robotInst = this.findRobotById(robot.id);

            if (robotInst != undefined) {
                // Update the existing robot
                robotInst.setCoordinates(robot.x, robot.y, robot.heading);
                console.log('  updated: ', robot);
            } else {
                // Create a new robot, if not exists
                this.addRobot(robot.id, robot.x, robot.y, robot.heading);
                console.log('  created: ', robot);
            }
        });
    };

    /**
    * method for getting the robot coordinates by id
    * return the current robot coordinates if it exists
    * return -1 if it doesn't exist
    * @param {number} id robot id
    */
    getCoordinates = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        const robotInst = this.findRobotById(id);
        if (robotInst != undefined) {
            return robotInst.getCoordinates();
        } else {
            return undefined;
        }
    };

    /**
    * method for getting the coordinates of all robots
    * return the current robot coordinates if it exists
    */
    getCoordinatesAll = () => {
        var resp = [];
        for (const key in this.list) {
            resp.push(this.list[key].getCoordinates());
        }
        return resp;
    };

    /**
    * method for getting the size of the robot list
    */
    getSize = () => {
        return this.size;
    };

    // TODO: add swarm functionality here
    // getSensorReadings
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

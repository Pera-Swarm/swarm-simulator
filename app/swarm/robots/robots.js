const { Robot } = require('../robot');

class Robots {
    constructor() {
        this.list = [];
        this.updated = Date.now();
    }

    /**
     * method for adding a robot
     * @param {id} id
     */
    addRobot = (id) => {
        this.list.push(new Robot(id));
    };

    // TODO: add swarm functionality here
    // updateRobot
    // findRobotById
    // getSensorReadings
    // getCoordinates
    // removeRobot
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

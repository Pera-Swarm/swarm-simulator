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
}

const initRobots = () => {
    return new Robots();
};

module.exports = {
    Robots,
    initRobots
};

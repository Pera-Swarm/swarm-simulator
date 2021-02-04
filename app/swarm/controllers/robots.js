const { Robot } = require('../robot/robot');

const { DistanceSensorEmulator, ColorSensorEmulator } = require('../emulators/sensors');
const {
    SimpleCommunicationEmulator,
    DirectionalCommunicationEmulator
} = require('../emulators/communication');
const { NeoPixelAgent } = require('../emulators/agents');

const { LocalizationController } = require('../controllers');

// Class for representing the robots level functionality
class Robots {
    /**
     * Robots constructor
     */
    constructor(swarm, mqttPublish) {
        if (swarm === undefined) throw new TypeError('Swarm unspecified');

        this.robotList = {};
        this.size = 0;
        this.updated = Date.now();
        this.swarm = swarm;
        this.mqttPublish = mqttPublish;
        this.debug = true;

        this.obstacleController = swarm.environment.obstacleController;

        // Simple Communication Module
        this.simpleCommunication = new SimpleCommunicationEmulator(
            this,
            this.mqttPublish,
            60,
            this.debug
        );

        // Directed Communication Module
        this.directedCommunication = new DirectionalCommunicationEmulator(
            this,
            this.mqttPublish,
            60,
            30,
            this.debug
        );

        // Distance Sensor Emulator
        this.distanceSensor = new DistanceSensorEmulator(
            this,
            this.mqttPublish,
            this.obstacleController
        );

        // Color Sensor Emulator
        this.colorSensor = new ColorSensorEmulator(
            this,
            this.mqttPublish,
            this.obstacleController
        );

        // NeoPixel Agent Module
        this.neopixel = new NeoPixelAgent(this.mqttPublish);

        // Localization Module
        this.localization = new LocalizationController(this.mqttPublish);
    }

    /**
     * method for obtaining default routes
     */
    get defaultSubscriptionRoutes() {
        const commRoutes = [
            // Communication
            ...this.simpleCommunication.defaultSubscriptions(),
            ...this.directedCommunication.defaultSubscriptions(),

            // Sensor Emulators
            ...this.distanceSensor.defaultSubscriptions(),
            ...this.colorSensor.defaultSubscriptions(),
            // ...this.proximitySensor.defaultSubscriptions(),

            // Agent Emulators
            ...this.localization.defaultSubscriptions(),
            ...this.neopixel.defaultSubscriptions(),

            // Robots specific topics
            {
                topic: 'robot/live',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Heartbeat signal from the robots to server
                    // console.log('MQTT_Robot: robot/live', msg);
                    const { id, reality } = msg;

                    let robot = this.findRobotById(id);

                    if (robot !== -1) {
                        const heartbeat = robot.updateHeartbeat();
                        //console.log('Heatbeat of the robot', msg, 'is updated to', heartbeat);
                    } else {
                        // No robot found.
                        this.createIfNotExists(id, reality, () => {
                            //console.log('A robot created', msg.id);
                        });
                    }
                }
            },
            {
                topic: 'robot/create',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Create a robot on simulator
                    console.log('MQTT_Robot: robot/create', msg);

                    const { id, heading, x, y, reality } = msg;
                    const resp = this.addRobot(id, heading, x, y, reality);
                }
            }
        ];
        return commRoutes;
    }

    initialPublishers = [];

    /**
     * method for adding a robot to the robotList
     * @param {number} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {'V'|'R'} reality reality of the robot, default: 'V'
     * @returns {Robot} Robot : if successful
     */
    addRobot = (id, heading, x, y, reality = 'V') => {
        if (id === undefined) throw new TypeError('id unspecified');

        // only add a robot if the id doesn't exist
        if (this.isExistsRobot(id) === false) {
            // robot doesn't exists
            if ((heading === undefined) | (x === undefined) || y === undefined)
                this.robotList[id] = new Robot(id);
            else this.robotList[id] = new Robot(id, heading, x, y, reality);

            this.size += 1;
        }
        return this.robotList[id];
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

        if (this.isExistsRobot(id)) {
            // remove the key along with the value.
            delete this.robotList[id];
            this.size--;
            this.updated = Date.now();

            this.mqttPublish('robot/delete', id);
            if (callback !== undefined) callback(id);

            console.log(`robot:deleted > ${id}`);
            return true;
        }
        return false;
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
     * @returns nothing
     */

    createIfNotExists = (id, reality = 'V', callback) => {
        if (id === undefined) throw new TypeError('id unspecified');
        if (this.isExistsRobot(id) == false) {
            const robot = this.addRobot(id); // create since robot doesn't exists
            robot.reality = reality; // set the reality of the robot, default: 'V'
            //console.log(robot);
        }

        if (callback !== undefined) callback();
        return;
    };

    /**
     * method for finding a robot exists or not
     * @param {number} id robot id
     * @returns {boolean} true : if robot exists
     */
    isExistsRobot = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');
        return this.robotList[id] != undefined;
    };

    /**
     * method for finding a robot alive or not
     * @param {number} id robot id
     * @param {number} interval considered time interval
     * @returns {boolean} true : if robot is alive
     * @returns false : if a robot doesn't alive
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

        let result = this.robotList[id];
        return result !== undefined ? result : -1;
    };

    /**
     * method for getting the robot coordinates by id
     * @param {number} id robot id
     * @returns {Coordinate|number} the robot coordinates : if it exists
     * @returns -1 : if it doesn't exist
     */
    getCoordinatesById = (id) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.isExistsRobot(id) === false) return -1;
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

        if (this.isExistsRobot(id) === false) return -1;

        const { x, y, heading } = this.findRobotById(id).getCoordinates();
        return `${x} ${y} ${heading}`;
    };

    /**
     * method for getting the coordinates of all robots
     * @returns {Coordinate[]} current robot coordinates : that are existing in the list
     */
    getCoordinatesAll = (reality = 'M') => {
        let result = [];
        for (const key in this.robotList) {
            if (this.robotList[key].reality == reality || reality == 'M') {
                // Return only robots with requested reality
                result.push(this.robotList[key].getCoordinates());
            }
        }
        return result;
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {'V'|'R'} reality Reality of the coordinates, default: 'V'
     * @param {Coordinate[]} coordinates coordinate data
     */
    updateCoordinates = (coordinates, reality = 'V') => {
        if (coordinates === undefined) throw new TypeError('coordinates unspecified');

        console.log(('reality', reality));

        coordinates.forEach((item) => {
            const { id, x, y, heading } = item;
            if (this.isExistsRobot(id)) {
                //console.log(id, this.isExistsRobot(id));
                this.findRobotById(id).setCoordinateValues(heading, x, y);
                this.findRobotById(id).reality = reality;
            } else {
                //console.log('robot added', id);
                this.addRobot(id, heading, x, y, reality);
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

        for (let id in this.robotList) {
            if (this.isAliveRobot(id, interval) == false) {
                this.removeRobot(id, callback);
            }
        }
    };

    broadcast = (instType, value, options = {}) => {
        if (instType === undefined) throw new TypeError('instruction type unspecified');
        if (value === undefined) throw new TypeError('value unspecified');

        const msg = `${instType} ${value}`;
        this.mqttPublish('robot/msg/broadcast', msg, options);
    };

    changeMode = (mode, options = {}) => {
        this.broadcast('MODE', value);
    };

    robotBuilder = (id, heading, x, y) => {
        return new Robot(id, heading, x, y);
    };
}

const initRobots = () => {
    return new Robots(this.swarm);
};

module.exports = {
    Robots,
    initRobots
};

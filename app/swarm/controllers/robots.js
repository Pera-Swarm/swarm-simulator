// Temp zone -------------------

// TODO: move following to env configs or any suitable place
const ROBOT_DIAMETER = 6;

const { sqrt, pow, round, atan2, abs } = require('mathjs');
const { normalizeAngle } = require('../../../dist/pera-swarm');
// -----------------------------

const { Robot } = require('../robot/robot');

// Robot sensor emulators
const {
    DistanceSensorEmulator,
    ColorSensorEmulator,
    ProximitySensorEmulator
} = require('../emulators/sensors');

// Robot communication emulators
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

        // Proximity Sensor Emulator
        this.proximitySensor = new ProximitySensorEmulator(
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
            ...this.proximitySensor.defaultSubscriptions(),
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
                    console.log('MQTT_Robot: robot/live', msg);

                    const { id, reality } = msg;
                    const robot = this.findRobotById(id);

                    if (robot !== -1) {
                        const heartbeat = robot.updateHeartbeat();
                        //console.log('Heatbeat of the robot', msg, 'is updated to', heartbeat);
                    } else {
                        // No robot found.
                        this.createIfNotExists(id, reality, () => {
                            console.log('A robot created', msg.id);
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
                    // console.log('MQTT_Robot: robot/create', msg);

                    const { id, heading, x, y, reality } = msg;
                    const resp = this.addRobot(id, heading, x, y, reality);
                }
            },
            // Robot snapshots
            {
                topic: 'mgt/robots/snapshot',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    const { id } = msg;
                    if (id !== undefined) {
                        // Handle robot snapshot request
                        const { id } = msg;
                        console.log('MQTT.Robot: mgt/robots/snapshot', msg);
                        const robot = this.findRobotById(id);
                        // TODO: Response data type not yet finalized in the server I think
                        const resp = {
                            id: id,
                            reality: robot.reality,
                            coordinates: robot.getCoordinatesPretty(),
                            live: robot.lastUpdate,
                            data: {
                                distance: robot.getData('distance')
                            }
                        };

                        console.log(resp);

                        swarm.mqttPublish('mgt/robots/?', resp);
                    }
                }
            },
            {
                topic: 'test',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    //console.log(msg);
                    const { x, y, heading } = msg;
                    const dist = this.getRobotDistance(heading, x, y);
                    console.log('Dist:', dist);
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
     * method for getting the coordinates of all robots
     * @returns {Coordinate[]} current robot coordinates : that are existing in the list
     */
    getCoordinatesAll = (reality = 'M') => {
        let result = [];
        for (const key in this.robotList) {
            if (this.robotList[key].reality == reality || reality == 'M') {
                const { x, y, heading } = this.robotList[key].getCoordinates();
                const resp = {
                    id: key,
                    x: x,
                    y: y,
                    heading: heading,
                    reality: this.robotList[key].reality
                };
                result.push(resp);
            }
        }
        return result;
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {'V'|'R'} reality Reality of the coordinates, default: 'V'
     * @param {Coordinate[]} coordinates coordinate data
     */
    updateCoordinates = (coordinates) => {
        if (coordinates === undefined) throw new TypeError('coordinates unspecified');

        //console.log(('reality', reality));

        coordinates.forEach((item) => {
            const { id, x, y, heading } = item;
            const reality = item.reality == undefined ? 'V' : item.reality;

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

    // Robot as an obstacle functions:

    getRobotDistance = (heading, x, y) => {
        const allCoord = this.getCoordinatesAll();
        const from = { x, y, heading };
        let minDist = Infinity;

        // TODO: reality filtering
        allCoord.forEach((to, index) => {
            // Target should not be the same robot,
            // TODO: use a better logic, ex: round to 2 digits and compare
            if (this._getDistance(from, to) >= 1) {
                // Obtain the angle difference and distance
                const angle = this._getAngle(from, to);
                const dist = this._getDistance(from, to);
                const angleTolerence = this._angleToleranceWithDistance(
                    dist,
                    ROBOT_DIAMETER + 6
                );
                const angleDiff = abs(heading - angle);
                // console.log(
                //     `angle=${angle}, dist=${dist}, angleDiff=${angleDiff}, angleTolerence=${angleTolerence}`
                // );

                // Robot is in front, if the angel is close to heading
                // The tolerance is depends with distance, tanInverse(Radius/Dist)
                // Added additional 5 deg additional threshold
                if (angleDiff < angleTolerence + 5) {
                    const realDist = dist - ROBOT_DIAMETER / 2;
                    // console.log(`\tYes, dist=${realDist}`);

                    if (realDist < minDist) {
                        minDist = realDist;
                    }
                }
            }
        });

        return minDist;
    };

    // TODO: implement followings on pera-swarm/helpers/geometricHelpers.ts
    _getAngle = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return normalizeAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
    };

    _getDistance = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return round(sqrt(Number(pow(xDiff, 2)) + Number(pow(yDiff, 2))), 2);
    };

    _angleToleranceWithDistance = (dist, width) => {
        const r = width / 2;
        const angleDiff = (Math.atan(r / dist) * 180) / Math.PI;

        return Math.round(angleDiff * 100) / 100;
    };
}

const initRobots = () => {
    return new Robots(this.swarm);
};

module.exports = {
    Robots,
    initRobots
};

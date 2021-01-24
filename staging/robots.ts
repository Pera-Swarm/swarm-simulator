import {
    Robot,
    Robots as AbstractRobots,
    DistanceSensor,
    SimpleCommunication,
    DirectedCommunication
} from 'pera-swarm';

// const { DistanceSensor } = require('../../modules/distanceSensor');

// Class for representing the robots level functionality
class Robots extends AbstractRobots {
    swarm: any;
    distanceSensor: DistanceSensor;
    simpleCommunication: SimpleCommunication;
    directedCommunication: DirectedCommunication;

    /**
     * Robots constructor
     */
    constructor(swarm: { arenaConfig: number; mqttPublish: number }, debug = false) {
        super(debug);
        if (swarm === undefined) throw new TypeError('Swarm unspecified');
        // this.robotList = {};
        // this.size = 0;
        // this.updated = Date.now();
        this.swarm = swarm;
        // this.debug = true;

        // Attach distance sensor with giving access to arenaConfig data and MQTT publish
        this.distanceSensor = new DistanceSensor(swarm.arenaConfig, swarm.mqttPublish);

        // Simple communication
        this.simpleCommunication = new SimpleCommunication(
            this,
            // @ts-ignore
            swarm.mqttPublish,
            100,
            this._debug
        );
        this.directedCommunication = new DirectedCommunication(
            this,
            // @ts-ignore
            swarm.mqttPublish,
            100,
            30,
            this._debug
        );
    }

    robotBuilder = (id: number, heading: number, x: number, y: number) => {
        //return new Robot(id, heading, x, y);
        throw new Error('Method not implemented');
    };

    /**
     * method for finding a robot alive or not
     * @param {number} id robot id
     * @param {number} interval considered time interval
     * @returns {boolean} true : if robot is alive
     * @returns false : if a robot doesn't alive
     */
    isAliveRobot = (id: number, interval: any) => {
        if (id === undefined) throw new TypeError('id unspecified');
        if (interval === undefined) throw new TypeError('interval unspecified');
        // @ts-ignore
        return this._robotList[id].isAlive(interval);
    };

    /**
     * method for removing the robot by id
     * @param {number} id robot id
     * @param {function} callback a callback function
     * @returns {boolean} true : if successful
     * @returns false : if it fails
     */
    removeRobot = (id: number, callback: Function) => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.isExistsRobot(id)) {
            // remove the key along with the value.
            delete this._robotList[id];
            this._size--;
            this._updated = Date.now();
            // this.swarm.mqttPublish('robot/delete', { id }, () => {
            //     if (callback !== undefined) callback(id);
            // });
            return true;
        }
        return false;
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {Coordinate[]} coordinates coordinate data
     */
    updateCoordinates = (coordinates: any[]) => {
        if (coordinates === undefined) throw new TypeError('coordinates unspecified');

        coordinates.forEach((item: { id: any; x: any; y: any; heading: any }) => {
            const { id, x, y, heading } = item;
            if (this.isExistsRobot(id)) {
                if (this.findRobotById(id) !== -1) {
                    // @ts-ignore
                    this.findRobotById(id).setCoordinates(heading, x, y);
                }
            } else {
                this.addRobot(id, heading, x, y);
            }
            this._updated = Date.now();
        });
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @param {function} callback a callback function. 'id' will be given as a parameter
     */
    prune = (interval: any, callback: any) => {
        if (interval === undefined) throw new TypeError('interval unspecified');

        for (let id in this._robotList) {
            if (this.isAliveRobot(Number(id), interval) == false) {
                this.removeRobot(Number(id), callback);
            }
        }
    };

    broadcast = (instType: string, value: string, options = {}) => {
        if (instType === undefined) throw new TypeError('instruction type unspecified');
        if (value === undefined) throw new TypeError('value unspecified');

        const msg = `${instType} ${value}`;
        // this.swarm.mqttPublish('robot/msg/broadcast', msg, options);
    };

    changeMode = (mode: any, options = {}) => {
        this.broadcast('MODE', mode, options);
    };

    // TODO: add swarm functionality here
    // getSensorReadings
    // stopRobot
    // resetRobot
}

// const initRobots = () => {
//     // TODO: Fix this, in testings
//     return new Robots(this.swarm);
// };

module.exports = {
    Robots
    // initRobots
};

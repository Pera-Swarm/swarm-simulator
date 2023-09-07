const {
    VirtualDistanceSensorEmulator,
    AbstractObstacleBuilder,
    realityResolver,
    ExtendedReality
} = require('../../../../dist/pera-swarm');

const robotConfig = require('../../../config/robot.config');

class DistanceSensorEmulator extends VirtualDistanceSensorEmulator {
    /**
     * DistanceSensorEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish MQTT publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(robots, mqttPublish, obstacleController = undefined) {
        super(robots, mqttPublish);
        this._obstacleController = obstacleController;
    }

    /**
     * getReading
     * @param {Robot} robot robot object
     * @param {ExtendedReality} reality reality need to be considered
     * @param {Function} callback function
     */
    getReading = (robot, reality = 'M', callback) => {
        const { x, y, heading } = robot.getCoordinatesPretty();

        // Minimum distance to the nearst obstacles
        const obstacleDist =
            this._obstacleController.getDistance(heading, x, y, reality) -
            robotConfig.diameter;

        // Minimum distance to the nearest robots
        const robotDist =
            this._robots.getRobotDistance(heading, x, y) - robotConfig.diameter;

        // Minimum distance
        const dist = Math.ceil(Math.min(obstacleDist, robotDist));

        this.publish(`sensor/distance/${robot.id}`, dist);

        robot.updateHeartbeat();
        this.setData(robot, dist); // 6 = robot width

        if (callback != undefined) callback(dist);
    };

    /**
     * setData
     * @param {Robot} robot robot object
     * @param {any} value distance value
     * @returns {boolean} success status
     */
    setData = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('distance', Number(value));
    };

    /**
     * defaultSubscriptions
     * @returns {object[]} MQTT routes
     */
    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/distance',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Listen for the virtual distance sensor reading requests
                    // console.log('MQTT_Sensor: sensor/distance', msg);
                    const { id, reality, dist } = msg;

                    let robot = this._robots.findRobotById(id);

                    if (robot != -1) {
                        const reqReality = realityResolver(reality, robot.reality);
                        // console.log(reqReality);

                        this.getReading(robot, reqReality, (dist) => {
                            // console.log('MQTT_Sensor:DistanceEmulator', dist);
                        });
                    } else {
                        console.log('MQTT_Sensor:Distance', 'Robot not found');
                    }
                }
            }
        ];
    };
}

module.exports = { DistanceSensorEmulator };

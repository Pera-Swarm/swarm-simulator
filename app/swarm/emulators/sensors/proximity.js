const {
    VirtualProximitySensorEmulator,
    AbstractObstacleBuilder,
    normalizeAngle,
    realityResolver
} = require('../../../../dist/pera-swarm');

const robotConfig = require('../../../config/robot.config');

class ProximitySensorEmulator extends VirtualProximitySensorEmulator {
    /**
     * ProximitySensorEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish mqtt publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(robots, mqttPublish, obstacleController = undefined) {
        super(robots, mqttPublish);
        this._obstacleController = obstacleController;
    }

    /**
     * getReading
     * @param {Robot} robot robot object
     * @param {ExtendedRealities} reality reality need to be considered
     * @param {Function} callback function
     */
    getReading = (robot, reality = 'M', callback) => {
        const { x, y, heading } = robot.getCoordinatesPretty();
        let obstacleDist = [];
        let robotDist = [];
        let dist = [];

        // Virtual proximity sensors are located on those directions,
        //    relative to the heading of the robot
        const distHeadings = [
            normalizeAngle(heading - 150),
            normalizeAngle(heading - 90),
            normalizeAngle(heading),
            normalizeAngle(heading + 90),
            normalizeAngle(heading + 150)
        ];

        for (var i = 0; i < distHeadings.length; i++) {
            // Minimum Proximity to obstacles
            obstacleDist[i] =
                this._obstacleController.getDistance(distHeadings[i], x, y, reality) -
                robotConfig.diameter;

            // Minimum Proximity to robots
            robotDist[i] =
                this._robots.getRobotDistance(distHeadings[i], x, y) -
                robotConfig.diameter;

            dist[i] = Math.ceil(Math.min(obstacleDist[i], robotDist[0])); // return as an int
        }

        console.log('Proximity:', dist, 'for', distHeadings, 'directions');
        console.log(
            `\t (reality:${reality})\t measured from (${x},${y})  ^${heading} for R_${robot.id}`
        );

        this.publish(`sensor/proximity/${robot.id}`, dist.join(' '));

        robot.updateHeartbeat();
        this.setData(robot, dist);

        if (callback != undefined) callback(dist);
    };

    /**
     * setData
     * @param {Robot} robot robot object
     * @param {any} value proximity value
     * @returns {boolean} success status
     */
    setData = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('proximity', Number(value));
    };

    /**
     * defaultSubscriptions
     * @returns {object[]} MQTT routes
     */
    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/proximity',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Listen for the virtual proximity sensor reading requests
                    console.log('MQTT_Sensor: sensor/proximity', msg);
                    const { id, reality } = msg;

                    let robot = this._robots.findRobotById(id);

                    if (robot != -1) {
                        const reqReality = realityResolver(reality, robot.reality);
                        // console.log(reqReality);

                        this.getReading(robot, reqReality, (proximity) => {
                            // console.log('MQTT_Sensor:ProximityEmulator', dist);
                        });
                    } else {
                        console.log('MQTT_Sensor:Proximity', 'Robot not found');
                    }
                }
            }
        ];
    };
}

module.exports = { ProximitySensorEmulator };

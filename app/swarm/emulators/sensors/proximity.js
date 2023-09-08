const {
    VirtualProximitySensorEmulator,
    AbstractObstacleBuilder,
    normalizeAngle,
    realityResolver,
    hexToRGBC,
    ExtendedReality
} = require('pera-swarm');

const robotConfig = require('../../../config/robot.config');

class ProximitySensorEmulator extends VirtualProximitySensorEmulator {
    /**
     * ProximitySensorEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish MQTT publish function
     * @param {number} colorSenseThreshold color sensing threshold
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(
        robots,
        mqttPublish,
        colorSenseThreshold = 30,
        obstacleController = undefined
    ) {
        super(robots, mqttPublish);
        this._obstacleController = obstacleController;
        this._colorSenseThreshold = colorSenseThreshold;
    }

    /**
     * getReading
     * @param {Robot} robot robot object
     * @param {Number[]} relativeAngles, in degrees, as an array
     * @param {ExtendedReality} reality reality need to be considered
     * @param {Function} callback function
     */
    getReading = (robot, relativeAngles = [0], reality = ExtendedReality.M, callback) => {
        const { x, y, heading } = robot.getCoordinatesPretty();
        let obstacleDist = [];
        let robotDist = [];
        let dist = [];
        let color = [];

        // Virtual proximity sensors are located on those directions,
        //    relative to the heading of the robot
        const sensorHeadings = relativeAngles.map((a) => normalizeAngle(heading - a));

        for (var i = 0; i < sensorHeadings.length; i++) {
            // Minimum Proximity to obstacles
            obstacleDist[i] =
                this._obstacleController.getDistance(sensorHeadings[i], x, y, reality) -
                robotConfig.diameter;

            // Minimum Proximity to robots
            robotDist[i] =
                this._robots.getRobotDistance(sensorHeadings[i], x, y) -
                robotConfig.diameter;

            dist[i] = Math.ceil(Math.min(obstacleDist[i], robotDist[0])); // return as an int
            color[i] = this._obstacleController.getColor(
                sensorHeadings[i],
                x,
                y,
                reality,
                this._distanceThreshold
            );
        }

        // console.log(
        //     `${dist.join(' ')} ${color.join(' ')} for [${sensorHeadings.join(' ')}\]`
        // );
        // console.log(
        //     `\t (reality:${reality})\t measured from (${x},${y})  ^${heading} for R_${robot.id}`
        // );

        this.publish(
            `sensor/proximity/${robot.id}`,
            `${dist.join(' ')} ${color.join(' ')}`
        );

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
                    const { id, reality, angles } = msg;

                    let robot = this._robots.findRobotById(id);

                    if (robot != -1) {
                        const reqReality = realityResolver(reality, robot.reality);
                        // console.log(reqReality);

                        this.getReading(robot, angles, reqReality, (proximity) => {
                            console.log('MQTT_Sensor:ProximityEmulator', proximity);
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

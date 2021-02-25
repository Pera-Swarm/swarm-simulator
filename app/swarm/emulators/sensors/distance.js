const {
    VirtualDistanceSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder,
    realityResolver
} = require('../../../../dist/pera-swarm');

class DistanceSensorEmulator extends VirtualDistanceSensorEmulator {
    /**
     * DistanceSensorEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish mqtt publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(robots, mqttPublish, obstacleController = undefined) {
        super(robots, mqttPublish);
        this._obstacleController = obstacleController;
    }

    getReading = (robot, reality = 'M', callback) => {
        const { x, y, heading } = robot.getCoordinatesPretty();

        // Minimum distance to obstacles
        const obstacleDist = this._obstacleController.getDistance(heading, x, y, reality);

        // Minimum distance to robots
        const robotDist = this._robots.getRobotDistance(heading, x, y);
        const dist = Math.ceil(Math.min(obstacleDist, robotDist)); // return as in int

        console.log(
            `Dist: ${dist} (reality:${reality})\t measured from (${x},${y})  ^${heading} for R_${robot.id}`
        );
        this.publish(`sensor/distance/${robot.id}`, dist);

        robot.updateHeartbeat();
        this.setData(robot, dist);

        if (callback != undefined) callback(dist);
    };

    setData = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('distance', Number(value));
    };

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
                    console.log('MQTT_Sensor: sensor/distance', msg);
                    const { id, reality } = msg;

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
                    //});
                }
            }
        ];
    };
}

module.exports = { DistanceSensorEmulator };

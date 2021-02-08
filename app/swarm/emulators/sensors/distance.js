const {
    VirtualDistanceSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
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

    getReading = (robot, callback) => {
        const { x, y, heading } = robot.getCoordinatesPretty();

        // TODO: @NuwanJ implement full logic
        let obstacleDist = this._obstacleController.getDistance(heading, x, y);

        console.log(`Dist: ${obstacleDist} \tmeasured from (${x},${y})  ^${heading}`);
        this.publish(`sensor/distance/${robot.id}`, obstacleDist);

        robot.updateHeartbeat();
        this.setData(robot, obstacleDist);

        if (callback != undefined) callback(obstacleDist);
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
                    // console.log('MQTT.Sensor: sensor/distance', msg);

                    //this._robots.createIfNotExists(msg.id, () => {
                    let robot = this._robots.findRobotById(msg.id);

                    if (robot != -1) {
                        this.getReading(robot, (dist) => {
                            // console.log('MQTT:Sensor:DistanceEmulator', dist);
                        });
                    } else {
                        console.log('MQTT_Sensor:DistanceEmulator', 'Robot not found');
                    }
                    //});
                }
            }
        ];
    };
}

module.exports = { DistanceSensorEmulator };

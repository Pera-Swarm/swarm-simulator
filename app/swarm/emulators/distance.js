const {
    VirtualDistanceSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
} = require('../../../dist/pera-swarm');

class DistanceSensorEmulator extends VirtualDistanceSensorEmulator {
    /**
     * DistanceSensorEmulator
     * @param {ArenaType} arena arena config
     * @param {Function} mqttPublish mqtt publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
     constructor(robots, mqttPublish, obstacleController = undefined) {
         super(robots);

         // @Override
         this._publish = mqttPublish;

         this._obstacleController = obstacleController;
     }

    getReading = (robot, callback) => {
        const { x, y, heading } = robot.getCoordinates();

        robot.updateHeartbeat();
        console.log('dist from ', { x, y, heading });

        let obstacleDist = this._obstacleController.getDistance(heading, x, y);
        // TODO: @NuwanJ implement a method for consider robots (phy|vir) as obstacles.
        // let robotDist = this._robots.getDistance(heading, x, y);

        this._publish(`sensor/distance/${robot.id}`, obstacleDist);
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
                    console.log('MQTT.Sensor: sensor/distance', msg);

                    //this._robots.createIfNotExists(msg.id, () => {
                    let robot = this._robots.findRobotById(msg.id);

                    if (robot != -1) {
                        this.getReading(robot, (dist) => {
                            console.log('MQTT:Sensor:DistanceEmulator', dist);
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

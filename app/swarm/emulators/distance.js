const {
    VirtualDistanceSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
} = require('../../../dist/pera-swarm');

class DistanceSensorEmulator extends VirtualDistanceSensorEmulator {
    _obstacleController;

    /**
     * DistanceSensorEmulator
     * @param {ArenaType} arena arena config
     * @param {Function} mqttPublish mqtt publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(robots, arena, mqttPublish, obstacleController = undefined) {
        console.log(obstacleController);

        super(robots, arena, mqttPublish);
        this._obstacleController = obstacleController;
    }

    getReading = (robot, callback) => {
        const { x, y, heading } = robot.getCoordinates();
        robot.updateHeartbeat();
        console.log({ x, y, heading });

        console.log(this);

        // let dist = round(this._getBorderDistance(x, y, heading) * 10); // return in mm
        let obstacleDist = this._obstacleController.getDistance(heading, x, y);
        // TODO: @NuwanJ
        // let robotDist = this._robots

        this.publish(`sensor/distance/${robot.id}`, dist);
        this.setReading(robot, dist);

        if (callback != undefined) callback(dist);
    };

    setReading = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('distance', Number(value));
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/distance',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Robot sends its own distance sensor readings to the simulator,
                    // as reply to the ‘{channal}/sensor/distance/{robotID}/?’ request
                    console.log('MQTT.Sensor: sensor/distance', msg);

                    let robot = this._robots.findRobotById(msg.id);

                    if (robot != -1) {
                        // console.log(this);

                        this.getReading(robot, (dist) => {
                            console.log('MQTT:Sensor:Distance_Handler', dist);
                        });
                    } else {
                        console.log('MQTT_Sensor:Distance_Handler', 'Robot not found');
                    }
                }
            }
        ];
    };
}

module.exports = { DistanceSensorEmulator };

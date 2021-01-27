const {
    VirtualColorSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
} = require('../../../dist/pera-swarm');

class ColorSensorEmulator extends VirtualColorSensorEmulator {
    _obstacleController;

    /**
     * ColorSensorEmulator
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
        console.log('color from ', { x, y, heading });

        let obstacleColor = this._obstacleController.getDistance(heading, x, y);
        // TODO: @NuwanJ implement a method to get robot colors too
        // let robotColor = this._robots.getDistance(heading, x, y);

        this.publish(`sensor/color/${robot.id}`, obstacleColor);
        this.setData(robot, color);

        if (callback != undefined) callback(obstacleColor);
    };

    setData = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('color', value);
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/color',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Listen for the virtual color sensor reading requests
                    console.log('MQTT.Sensor: sensor/color', msg);

                    let robot = this._robots.findRobotById(msg.id);

                    if (robot != -1) {
                        this.getReading(robot, (color) => {
                            console.log('MQTT:Sensor:ColorEmulator', color);
                        });
                    } else {
                        console.log('MQTT_Sensor:ColorEmulator', 'Robot not found');
                    }
                }
            }
        ];
    };
}

module.exports = { ColorSensorEmulator };

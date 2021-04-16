const {
    VirtualColorSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder,
    realityResolver,
    hexToRGBC
} = require('../../../../dist/pera-swarm');

class ColorSensorEmulator extends VirtualColorSensorEmulator {
    /**
     * ColorSensorEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish mqtt publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     */
    constructor(robots, mqttPublish, obstacleController = undefined) {
        super(robots, mqttPublish);
        this._obstacleController = obstacleController;
    }

    getReading = (robot, reality = 'M', callback) => {
        const { x, y, heading } = robot.getCoordinates();

        // TODO: what about other robot colors ?

        // Color reading of the obstacle, if it less than given threshold (in cm)
        const COLOR_SENSE_DISTANCE = 30;

        const hexColor = this._obstacleController.getColor(
            heading,
            x,
            y,
            reality,
            COLOR_SENSE_DISTANCE
        );
        let obstacleColor = hexToRGBC(hexColor);

        // console.log(
        //     'Color:',
        //     obstacleColor,
        //     ` (reality:${reality})\t measured from (${x},${y})  ^${heading} for R_${robot.id}`
        // );

        this.publish(
            `sensor/color/${robot.id}`,
            `${obstacleColor.R} ${obstacleColor.G} ${obstacleColor.B} ${obstacleColor.C}`
        );

        this.setData(robot, obstacleColor);
        robot.updateHeartbeat();

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
                    // console.log('MQTT_Sensor: sensor/color', msg);

                    const { id, reality } = msg;
                    let robot = this._robots.findRobotById(id);

                    if (robot != -1) {
                        const reqReality = realityResolver(reality, robot.reality);
                        // console.log(reqReality);

                        this.getReading(robot, reqReality, (color) => {
                            // console.log('MQTT_Sensor:Color', color);
                        });
                    } else {
                        console.log('MQTT_Sensor:Color', 'Robot not found');
                    }
                }
            }
        ];
    };
}

module.exports = { ColorSensorEmulator };

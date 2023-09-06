const { Robot } = require('pera-swarm');
const {
    VirtualColorSensorEmulator,
    AbstractObstacleBuilder,
    realityResolver,
    hexToRGBC,
    ExtendedRealities
} = require('../../../../dist/pera-swarm');

class ColorSensorEmulator extends VirtualColorSensorEmulator {
    /**
     * ColorSensorEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish MQTT publish function
     * @param {AbstractObstacleBuilder | undefined} obstacleController (optional) obstacle controller
     * @param {number} distanceThreshold maximum distance that color sensor can sense, in cm, default=30
     */
    constructor(
        robots,
        mqttPublish,
        obstacleController = undefined,
        distanceThreshold = 30
    ) {
        super(robots, mqttPublish, distanceThreshold);
        this._obstacleController = obstacleController;
    }

    /**
     * getReading
     * @param {Robot} robot robot object
     * @param {ExtendedRealities} reality reality need to be considered
     * @param {Function} callback function
     */
    getReading = (robot, reality = 'M', callback) => {
        const { x, y, heading } = robot.getCoordinates();

        const hexColor = this._obstacleController.getColor(
            heading,
            x,
            y,
            reality,
            this._distanceThreshold
        );
        let obstacleColor = hexToRGBC(hexColor);

        this.publish(
            `sensor/color/${robot.id}`,
            `${obstacleColor.R} ${obstacleColor.G} ${obstacleColor.B} ${obstacleColor.C}`
        );

        this.setData(robot, obstacleColor);
        robot.updateHeartbeat();

        if (callback != undefined) callback(obstacleColor);
    };

    /**
     * setData
     * @param {Robot} robot robot object
     * @param {any} value color value
     * @returns {boolean} success status
     */
    setData = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('color', value);
    };

    /**
     * defaultSubscriptions
     * @returns {object[]} MQTT routes
     */
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

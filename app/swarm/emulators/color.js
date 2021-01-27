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
    constructor(arena, mqttPublish, obstacleController = undefined) {
        super(null, arena, mqttPublish);
        this._obstacleController = obstacleController;
    }

    getReading = (robot, callback) => {
        /*
        const { x, y, heading } = robot.getCoordinates();
        robot.updateHeartbeat();
        console.log(x, y, heading);
        let dist = round(this._getBorderDistance(x, y, heading) * 10); // return in mm

        this.publish(`sensor/distance/${robot.id}`, dist);
        this.setReading(robot, dist);

        if (callback != undefined) callback(dist);
        */
    };

    setReading = (robot, value) => {
        /*
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('distance', Number(value));
        */
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/color',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robot sends its own sensor readings to the server,
                    // as a reply to the ‘{channal}/sensor/color/{robotID}/?’ request
                    console.log('MQTT.Sensor: sensor/color', msg);
                    let robot = swarm.robots.findRobotById(msg.id);
                    if (robot != undefined) {
                        // TODO: implement return value
                        const returnValue = 10; //robot.sensors.distance.syncReading(msg.distance);
                        swarm.mqttPublish('sensor/color/' + robot.id, returnValue);
                    } else {
                        // No robot found. Just echo the message, because this is a blocking call for the robot
                        swarm.mqttPublish('sensor/color/' + msg.id, msg.distance);
                    }
                }
            }
        ];
    };
}

module.exports = { ColorSensorEmulator };

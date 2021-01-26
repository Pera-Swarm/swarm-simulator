// const { abs, round, cos, sin } = require('mathjs');
const {
    VirtualDistanceSensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
} = require('../../../dist/pera-swarm');

/* ------------------------------------------------------
Arena coordinate system (top view)

P1   L4  P2
┍━━━┑
L3 ┃   ┃ L1
┕━━━┛
P3  L2  P4

Axises: ↑ Y, → X
------------------------------------------------------ */

class ColorSensorEmulator extends VirtualDistanceSensorEmulator {
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
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robots can request virtual color. sensor reading through this
                    console.log('MQTT.Color: sensor/color', msg);
                    // TODO: publish the virtual color reading to
                    // sensor/color/{robotId}
                }
            }
        ];
    };
}

module.exports = { ColorSensorEmulator };

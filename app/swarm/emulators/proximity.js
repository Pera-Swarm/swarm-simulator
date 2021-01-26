// const { abs, round, cos, sin } = require('mathjs');
const {
    VirtualProximitySensorEmulator,
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

class ProximitySensorEmulator extends VirtualProximitySensorEmulator {
    _obstacleController;
    /**
     * ProximitySensorEmulator
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

        this.publish(`sensor/proximity/${robot.id}`, dist);
        this.setReading(robot, dist);

        if (callback != undefined) callback(dist);
        */
    };

    setReading = (robot, value) => {
        /*
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('proximity', Number(value));
        */
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/proximity',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robot sends its own sensor readings to the server,
                    // as a reply to the ‘{channal}/sensor/proximity/{robotID}/?’ request
                    console.log('MQTT.Sensor: sensor/proximity', msg);

                    // No actions need to be here,
                    // since there no any physical sensor for now.
                }
            }
        ];
    };
}

module.exports = { ProximitySensorEmulator };

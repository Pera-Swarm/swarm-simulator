const { abs, round, cos, sin } = require('mathjs');
const { VServerDistanceSensor } = require('../../../../dist/pera-swarm');

class CentralDistanceSensorModule extends VServerDistanceSensor {
    constructor(arena, mqttPublish) {
        super(null, arena, mqttPublish);
    }

    getReading = (robot, callback) => {
        const { x, y, heading } = robot.getCoordinates();
        robot.updateHeartbeat();
        console.log(x, y, heading);
        let dist = round(this._getBorderDistance(x, y, heading) * 10); // return in mm

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
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robots can request virtual dist. sensor reading through this
                    console.log('MQTT.Dist: sensor/distance', msg);
                    // TODO: publish the virtual distance reading to
                    // sensor/distance/{robotId}
                }
            }
        ];
    };
}

module.exports = { CentralDistanceSensorModule };

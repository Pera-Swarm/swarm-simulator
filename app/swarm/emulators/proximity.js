// const { abs, round, cos, sin } = require('mathjs');
const {
    VirtualProximitySensorEmulator,
    ArenaType,
    AbstractObstacleBuilder
} = require('../../../dist/pera-swarm');

class ProximitySensorEmulator extends VirtualProximitySensorEmulator {
    _obstacleController;
    /**
     * ProximitySensorEmulator
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
        console.log('proximity from ', { x, y, heading });

        let proximity = [0, 0, 0, 0, 0];

        this.publish(`sensor/proximity/${robot.id}`, proximity);
        this.setData(robot, proximity);

        if (callback != undefined) callback(dist);
    };

    setReading = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('proximity', value);
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'sensor/proximity',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg) => {
                    // Listen for the virtual proximity sensor reading requests
                    console.log('MQTT.Sensor: sensor/proximity', msg);

                    let robot = this._robots.findRobotById(msg.id);

                    if (robot != -1) {
                        this.getReading(robot, (dist) => {
                            console.log('MQTT:Sensor:ProximityEmulator', dist);
                        });
                    } else {
                        console.log('MQTT_Sensor:ProximityEmulator', 'Robot not found');
                    }
                }
            }
        ];
    };
}

module.exports = { ProximitySensorEmulator };

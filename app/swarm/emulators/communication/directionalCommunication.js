const { DirectedCommunication } = require('../../../../dist/pera-swarm');

class DirectionalCommunicationEmulator extends DirectedCommunication {
    /**
     * SimpleCommunicationEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish mqtt publish function
     * @param {number} maxDistance max transmission distance, in cm, default=100
     * @param {number} angleThreshold transmission angle threshold, in degrees, default=30
     * @param {boolean} debug default=false
     */
    constructor(
        robots,
        mqttPublish,
        maxDistance = 100,
        angleThreshold = 30,
        debug = false
    ) {
        super(robots, mqttPublish, maxDistance, angleThreshold, debug);
    }

    defaultSubscriptions = () => {
        return [
            {
                topic: 'comm/out/direct',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: true,
                handler: (msg) => {
                    // The robots can transmit messages to other robots using a transmission protocol.
                    // Server will decide the robots who can receive the message
                    console.log('MQTT.Comm: comm/out/direct', msg);
                    const { id, dist } = msg;

                    const robot = this._robots.findRobotById(id);
                    if (robot != undefined) {
                        // TODO:  implementation for custom distances
                        // robot.setData('comm_simple:out', msg.id, msg.msg);
                        this.broadcast(id, msg.msg, dist, 'comm/in/direct', (data) => {
                            console.log('Sent to', data.receivers, 'robots');
                        });
                    }
                }
            }
        ];
    };
}

module.exports = { DirectionalCommunicationEmulator };

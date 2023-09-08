const { SimpleCommunication } = require('pera-swarm');

class SimpleCommunicationEmulator extends SimpleCommunication {
    /**
     * SimpleCommunicationEmulator
     * @param {Robots} robots robot object
     * @param {Function} mqttPublish MQTT publish function
     * @param {number} maxDistance max transmission distance, in cm, default=100
     * @param {boolean} debug default=false
     */
    constructor(robots, mqttPublish, maxDistance = 100, debug = false) {
        super(robots, mqttPublish, maxDistance, debug);
    }

    /**
     * defaultSubscriptions
     * @returns {object[]} MQTT routes
     */
    defaultSubscriptions = () => {
        return [
            {
                topic: 'comm/out/simple',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: true,
                handler: (msg) => {
                    // The robots can transmit messages to other robots using a transmission protocol.
                    // Server will decide the robots who can receive the message
                    console.log('MQTT.Comm: comm/out/simple', msg);
                    const { id, dist } = msg;

                    const robot = this._robots.findRobotById(id);
                    if (robot != undefined) {
                        // TODO:  implementation for custom distances
                        // robot.setData('comm_simple:out', msg.id, msg.msg);
                        this.broadcast(id, msg.msg, dist, 'comm/in/simple', (data) => {
                            console.log('Sent to', data.receivers, 'robots');
                        });
                    }
                }
            }
        ];
    };
}

module.exports = { SimpleCommunicationEmulator };

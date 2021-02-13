const { SimpleCommunication } = require('../../../../dist/pera-swarm');

class SimpleCommunicationEmulator extends SimpleCommunication {
    constructor(robots, mqttPublish, maxDistance = 100, debug = false) {
        super(robots, mqttPublish, maxDistance, debug);
    }

    broadcast = (id, msg, callback) => {
        super.broadcast(id, msg, callback);

        // TODO: Test the functionality @luk3Sky
        // Save the last broadcast message in the robot.data
        // And extend to directedCommunication too
        const robot = this._robots.findRobotById(id);
        if (robot != undefined) {
            robot.setData('comm_simple:in', msg);
        }
    };

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

                    const robot = this._robots.findRobotById(id);
                    if (robot != undefined) {
                        // TODO: Please check the functionality @luk3Sky
                        robot.setData('comm_simple:out', msg);

                        this.broadcast(msg.id, msg.msg, (data) => {
                            console.log('Sent to', data.receivers, 'robots');
                        });
                    }
                }
            }
        ];
    };
}

module.exports = { SimpleCommunicationEmulator };

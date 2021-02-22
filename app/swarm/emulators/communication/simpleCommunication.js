const { SimpleCommunication } = require('../../../../dist/pera-swarm');

class SimpleCommunicationEmulator extends SimpleCommunication {
    constructor(robots, mqttPublish, maxDistance = 100, debug = false) {
        super(robots, mqttPublish, maxDistance, debug);
    }

    // broadcast = (id, msg, topic, callback) => {
    //   super.broadcast(id, msg, topic, callback);
    //     // console.log(id, msg);
    //     const robot = this._robots.findRobotById(id);
    //     if (robot != undefined) {
    //         robot.setData('comm_simple:in', msg);
    //     }
    // };

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

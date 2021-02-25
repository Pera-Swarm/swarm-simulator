const { DirectedCommunication } = require('../../../../dist/pera-swarm');

class DirectionalCommunicationEmulator extends DirectedCommunication {
    // TODO: @NuwanJ
    constructor(robots, mqttPublish, maxDistance = 100, debug = false) {
        super(robots, mqttPublish, maxDistance, debug);
    }

    // broadcast = (id, msg, callback) => {
    //     super.broadcast(id, msg, 'comm/in/direct', callback);
    //     const robot = this._robots.findRobotById(id);
    //     if (robot != undefined) {
    //         robot.setData('comm_simple:in', msg);
    //     }
    // };

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

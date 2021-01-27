const { SimpleCommunication } = require('../../../../dist/pera-swarm');

class SimpleCommunicationEmulator extends SimpleCommunication {
    // TODO: @NuwanJ
    constructor(robots, mqttPublish, maxDistance = 100, debug = false) {
        super(robots, mqttPublish, maxDistance, debug);
    }

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

                    this.broadcast(msg.id, msg.msg, (data) => {
                        console.log('Sent to', data.receivers, 'robots');
                    });
                }
            }
        ];
    };
}

module.exports = { SimpleCommunicationEmulator };

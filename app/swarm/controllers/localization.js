const { VirtualLocalizationController } = require('../../../dist/pera-swarm');

class LocalizationController extends VirtualLocalizationController {
    constructor(mqttPublish, publishTopic = 'localization/') {
        super(mqttPublish, publishTopic);
    }

    defaultSubscriptions = () => {
        return [
            {
                topic: 'localization',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robot will call this method to get it's own localization values; x,y,heading
                    // console.log('MQTT.Localization: /localization', msg);

                    const { id, x, y, heading } = msg;
                    const robotCoordinateString = swarm.robots.getCoordinateStringById(
                        id
                    );

                    if (robotCoordinateString !== -1) {
                        swarm.mqttPublish(`localization/${id}`, robotCoordinateString);
                    } else {
                        // No robot found
                        if (x != undefined && y != undefined && heading != undefined) {
                            // Just echo the message, because this is a blocking call for the robot
                            const returnMsg = `${x} ${y} ${heading}`;
                            swarm.mqttPublish(`localization/${id}`, returnMsg);
                        } else {
                            // no need to provide any reply
                        }
                    }
                }
            },
            {
                topic: 'localization/info',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // This will be called by Localization System and the virtual robots,
                    // to inform the updates on their coordinates
                    // console.log('MQTT.Localization: /localization/info ', msg);

                    // Update robot coordinates (& create, if not exists) using received list of coordinates
                    swarm.robots.updateCoordinates(msg);
                }
            },
            {
                topic: 'localization/?',
                type: 'String',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // This will print all available localization detail into topic 'localization/info'
                    // console.log('MQTT.Localization: localization/?', msg);

                    let coordinates = JSON.stringify(swarm.robots.getCoordinatesAll());
                    swarm.mqttPublish('localization/info', coordinates);
                }
            }
        ];
    };

    initialPublishers = [
        {
            topic: 'localization/update',
            data: '?'
        }
    ];
}

module.exports = {
    LocalizationController
};

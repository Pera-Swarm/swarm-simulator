const { VirtualLocalizationController } = require('../../../dist/pera-swarm');

class LocalizationController extends VirtualLocalizationController {
    constructor(mqttPublish, publishTopic = 'localization/') {
        super(mqttPublish, publishTopic);
    }

    defaultSubscriptions = () => {
        return [
            {
                topic: 'localization/data/?',
                type: 'String',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // This will print all available localization detail into topic 'localization/info'
                    // console.log('MQTT_Localization: localization/?', msg);

                    const reality = msg == 'V' || msg == 'R' ? msg : 'M';
                    const resp = JSON.stringify(swarm.robots.getCoordinatesAll(reality));

                    swarm.mqttPublish('localization/data', resp);
                }
            },
            {
                topic: 'localization',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robot will call this method to get it's own localization values; x,y,heading
                    // This is called by physical robots
                    //console.log('MQTT_Localization: /localization', msg);

                    const id = msg;
                    const { x, y, heading } = swarm.robots.getCoordinatesById(id);

                    if (x !== undefined) {
                        swarm.mqttPublish(`localization/${id}`, `${x} ${y} ${heading}`);
                    } else {
                        // No robot found, no return message
                        console.error(
                            'MQTT_Localization: /localization',
                            msg,
                            '| Robot not found'
                        );
                    }
                }
            },
            {
                topic: 'localization/update',
                type: 'JSON',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // This will be called by Localization System and the virtual robots,
                    // to inform the updates on their coordinates

                    console.log('MQTT_Localization: /localization/update', msg);

                    swarm.robots.updateCoordinates(msg);
                }
            }
        ];
    };

    initialPublishers = [
        {
            topic: 'localization/update/?',
            data: '?'
        }
    ];
}

module.exports = {
    LocalizationController
};

// localization routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
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
            const robotCoordinateString = swarm.robots.getCoordinateStringById(id);

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
        topic: 'localization/update',
        type: 'JSON',
        allowRetained: false,
        subscribe: false,
        publish: true,
        handler: (msg, swarm) => {
            // This will request coordinate updates from the Localization System, and virtual robots
            // console.log('MQTT.Localization: /localization/update', msg);
            // No actions need to be here, just for representation
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

module.exports = routes;

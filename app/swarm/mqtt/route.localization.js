// localization routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'localization/info',
        allowRetained: true,
        subscribe: true,
        handler: (msg, swarm) => {
            // This will be called by Localization System and the virtual robots
            //console.log('MQTT_Localization:RequestUpdateLoc ', msg);
            swarm.loc_system.update(msg);

            // Update robots & create, if not exists
            swarm.robots.updateCoordinates(msg);
        }
    },
    {
        topic: 'localization/update',
        allowRetained: false,
        subscribe: false,
        publish: true,
        handler: (msg, swarm) => {
            // This will request coordinate updates from the Localization System, and virtual robots

            swarm.robots.createIfNotExists(msg.id);
            console.log('MQTT_Localization:RequestLocUpdates ', msg);
        }
    },
    {
        topic: 'localization/',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            // Robot will call this method to get it's own localization values; x,y,heading

            console.log('MQTT_Localization:RequestUnitLoc ', msg);

            const { id, x, y, heading } = msg;
            var robotCoordinateString = swarm.robots.getCoordinateStringById(id);

            if (robotCoordinateString !== -1) {
                swarm.publish(`localization/${id}`, robotCoordinateString);
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot
                // TODO: register the robot into system
                const returnMsg = `${x} ${y} ${heading}`;
                swarm.publish(`localization/${id}`, returnMsg);
            }
        }
    },
    {
        topic: 'localization/?',
        allowRetained: false,
        type: 'String',
        subscribe: true,
        handler: (msg, swarm) => {
            // This will print all available localization detail
            console.log('MQTT_Localization:RequestPrintLoc ', msg);

            var coordinates = JSON.stringify(swarm.robots.getCoordinatesAll());
            swarm.publish('localization/print', coordinates);
        }
    }
];

module.exports = routes;

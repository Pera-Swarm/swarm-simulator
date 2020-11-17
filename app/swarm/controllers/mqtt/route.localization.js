// localization routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/localization/info',
        allowRetained: true,
        subscribe: true,
        handler: (msg, swarm) => {
            //console.log('MQTT_Localization:Info_Handler', msg);
            // This will be called by Localization System and the virtual robots
            console.log('MQTT_Localization:RequestUpdateLoc ', msg);
            swarm.loc_system.update(msg);
            swarm.robots.updateCoordinates(msg);
        }
    },
    {
        topic: 'v1/localization/update',
        allowRetained: false,
        subscribe: false,
        handler: (msg, swarm) => {
            // This will request coordinate updates from the Localization System, and virtual robots
            console.log('MQTT_Localization:RequestLocUpdates ', msg);
        }
    },
    {
        topic: 'v1/localization/',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            // Robot will call this method to get it's own localization values; x,y,heading
            console.log('MQTT_Localization:RequestUnitLoc ', msg);
            const { id, x, y, heading } = msg;
            var robotCoordinateString = swarm.robots.getCoordinateStringById(id);
            if (robotCoordinateString !== -1) {
                swarm.publish(`v1/localization/${id}`, robotCoordinateString);
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot
                // TODO: register the robot into system
                const returnMsg = `${x} ${y} ${heading}`;
                swarm.publish(`v1/localization/${id}`, returnMsg);
            }
        }
    },
    {
        topic: 'v1/localization/?',
        allowRetained: false,
        type: 'String',
        subscribe: true,
        handler: (msg, swarm) => {
            // This will print all available localization detail
            console.log('MQTT_Localization:RequestPrintLoc ', msg);
            var coordinates = JSON.stringify(swarm.robots.getCoordinatesAll());
            swarm.publish('v1/localization/print', coordinates);
        }
    }
];

module.exports = routes;

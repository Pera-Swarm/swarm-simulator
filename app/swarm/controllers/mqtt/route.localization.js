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
            swarm.robots.locationUpdate(msg);
        }
    },
    {
        topic: 'v1/localization/update',
        allowRetained: false,
        subscribe: false,
        handler: (msg, swarm) => {
            // This will request coordinate updates from the Localization System, and virtual robots
        }
    },
    {
        topic: 'v1/localization/',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            // Robot will call this method to get it's own localization values; x,y,heading

            console.log('MQTT_Localization:RequestLoc ', msg);
            var robot = swarm.robots.findRobotById(msg.id);

            if (robot != undefined) {
                const c = robot.getCoordinates();
                const returnMsg =
                    parseInt(c.x) + ' ' + parseInt(c.y) + ' ' + parseInt(c.heading);
                swarm.publish('v1/localization/' + robot.id, returnMsg);
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot
                // TODO: register the robot into system
                const returnMsg = '0 0 0';
                swarm.publish('v1/localization/' + robot.id, returnMsg);
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
            var coordinates = JSON.stringify(swarm.robots.getCoordinatesAll());
            swarm.publish('v1/localization/print', coordinates);
        }
    }
];

module.exports = routes;

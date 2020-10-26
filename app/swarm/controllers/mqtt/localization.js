// sensor routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/localization/info',
        allowRetained: true,
        handler: (msg, swarm) => {
            //console.log('MQTT_Localization:Info_Handler', msg);

            // TODO: write this function
            swarm.robots.locationUpdate(msg);
        },
        subscribe: true,
    },
    {
        topic: 'v1/robot/create',
        allowRetained: true,
        handler: (msg, swarm) => {
            //console.log('Creating > id:',msg.id,'x:',msg.x,'y:',msg.y);
            swarm.robots.addRobot(msg.id, msg.x, msg.y, msg.heading);
        },
        subscribe: true,
    }
];

module.exports = routes;

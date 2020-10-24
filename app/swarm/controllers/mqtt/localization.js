// sensor routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/localization/info',
        allowRetained: true,
        handler: (msg, swarm) => {
            console.log('localization handler', msg);
            console.log(msg);
            // console.log(swarm);
            
            // TODO: swarm.updateLocalization(msg.id, 'distance');

            swarm.publish('v1/robot/live', 'sample msg loc');
        }
    }
];

module.exports = routes;

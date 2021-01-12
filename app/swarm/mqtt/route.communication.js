// control routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'comm/out/directional',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            // this = SimpleCommunication
            console.log(`Comm:Directed > robot ${msg.id} transmitted ${msg.msg}`);
            /*swarm.robots.directedCommunication.broadcast(
                msg.id,
                msg.msg,
                console.log('Simple broadcast')
            );*/
        }
    }
];

module.exports = routes;

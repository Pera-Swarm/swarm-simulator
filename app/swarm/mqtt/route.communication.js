// control routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'comm/out/directional',
        type: 'JSON',
        allowRetained: false,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // call directed communication braodcast
            console.log(`Comm:Directed > robot ${msg.id} transmitted ${msg.msg}`);
            swarm.robots.directedCommunication.broadcast(
                msg.id,
                msg.msg,
                console.log('Simple broadcast')
            );
        }
    },
    {
        topic: 'comm/out/simple',
        type: 'JSON',
        allowRetained: false,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // call simple communication braodcast
            console.log(`Comm:Simple > robot ${msg.id} transmitted ${msg.msg}`);
            swarm.robots.directedCommunication.broadcast(
                msg.id,
                msg.msg,
                console.log('Simple broadcast')
            );
        }
    }
];

module.exports = routes;

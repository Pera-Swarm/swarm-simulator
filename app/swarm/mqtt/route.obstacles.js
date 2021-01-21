// obstacle routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'obstacles/?',
        type: 'String',
        allowRetained: true,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Heartbeat signal from the robots to server
            console.log('MQTT.Obstacles: obstacles/?', msg);
            // console.log(swarm.obstacleController.visualizeObstacles());
            // swarm.mqttPublish('obstacles', swarm.obstacleController.visualizeObstacles());
        }
    }
];

const initialPublishers = [
    {
        topic: '/obstacles/delete/all',
        data: '?'
    }
];

module.exports = routes;
module.exports.initialPublishers = initialPublishers;

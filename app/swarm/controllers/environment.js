const { Environment } = require('../../../dist/pera-swarm');

class EnvironmentController extends Environment {
    get defaultSubscriptionRoutes() {
        return [
            {
                topic: 'obstacles/?',
                type: 'String',
                allowRetained: true,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Heartbeat signal from the robots to server
                    console.log('MQTT.Obstacles: obstacles/?', msg);

                    swarm.mqttPublish('obstacles', swarm.environment.getObstaclesAll(), {
                        qos: 2,
                        dup: false,
                        retain: true
                    });
                }
            }
        ];
    }

    // TODO: publish areanConfig to the visualizer as a initial publisher
    // This will help to change the size of the arena for each experiment

    initialPublishers = [
        {
            topic: '/obstacles/delete/all',
            data: '?'
        }
    ];
}

module.exports = {
    EnvironmentController
};

const { Environment, ExtendedReality } = require('../../../dist/pera-swarm');

class EnvironmentController extends Environment {
    /**
     * defaultSubscriptions
     * @returns {object[]} MQTT routes
     */
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
                    let obstacles;

                    if (msg === ExtendedReality.R || msg === ExtendedReality.V) {
                        obstacles = this.getObstaclesList(msg);
                    } else {
                        obstacles = this.getObstaclesList(ExtendedReality.M);
                    }

                    swarm.mqttPublish('obstacles', obstacles, {
                        qos: 2,
                        retain: true
                    });
                }
            }
        ];
    }

    initialPublishers = [
        {
            topic: '/obstacles/delete/all',
            data: '?'
        },
        {
            topic: '/config/arena/',
            data: this._config.arena,
            options: {
                retain: true
            }
        }
    ];
}

module.exports = {
    EnvironmentController
};

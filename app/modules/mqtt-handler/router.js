// TODO: Add an option to add new subscription / remove subscriptions to the route list even after init
const { MqttClient } = require('mqtt');

class MQTTRouter {
    /**
     * MQTTRouter constructor
     * @param {MqttClient} mqttConnection mqtt connection
     * @param {[]} routes routes with mqtt topic, handler and allowRetained properties
     * @param {object} options mqtt message options
     * @param {function} setup setup function that runs on connection success
     * @param {function} onError error handler function
     */
    constructor(mqttConnection, routes, options, setup, onError) {
        this.mqttClient = mqttConnection;
        if (Array.isArray(routes)) {
            this.routes = routes;
        } else {
            this.routes = [
                {
                    topic: 'v1/',
                    allowRetained: true,
                    handler: (topic, msg) => {
                        try {
                            var data = JSON.parse(msg);
                            console.log('Default Subscriber picked up the topic', data);
                        } catch (err) {
                            // TODO: use errorHandler
                            this.errorHandler(err);
                        }
                    }
                }
            ];
        }
        if (options !== undefined) {
            this.options = options;
        } else {
            this.options = { qos: 2, rap: true, rh: true };
        }
        if (setup !== undefined) {
            this.setup = setup;
        } else {
            this.setup = null;
        }
        if (onError !== undefined) {
            this.errorHandler = onError;
        } else {
            this.errorHandler = (err) => {
                console.error('mqtt.error: ', err);
            };
        }
    }

    /**
     * method for starting the mqtt handler
     */
    start = () => {
        this.mqttClient.on('connect', () => {
            this.handleRouteSubscriptions();
            if (this.setup !== null && this.setup !== undefined) {
                this.setup();
            }
        });

        this.mqttClient.on('error', (err) => {
            this.errorHandler(err);
        });

        this.mqttClient.on('message', (topic, message, packet) => {
            // Check JSON format
            try {
                const data = JSON.parse(message);

                if (packet.retain === false) {
                    this.retainFalseLogic(topic, data, packet);
                } else {
                    // Also accept older messages
                    this.retainTrueLogic(topic, data, packet);
                }
            } catch (err) {
                // TODO: use errorHandler
                this.errorHandler(err);
            }
        });
    };

    /**
     * method for handling the subscriptions for the topics in the routes list.
     */
    handleRouteSubscriptions = () => {
        for (var i = 0; i < this.routes.length; i++) {
            //console.log(this.routes[i]);
            this.mqttClient.subscribe(this.routes[i].topic, this.options);
            console.log('Subscribed to', this.routes[i].topic);
        }
    };

    /**
     * method for filtering retain false handling logic
     * @param {string} topic mqtt topic
     * @param {object} message mqtt message object
     * @param {object} packet mqtt packet object
     */
    retainFalseLogic = (topic, message, packet) => {
        console.log('Fresh msg: ', topic, '>', message);

        for (var i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].topic === topic) {
                this.routes[i].handler(message);
            }
        }
    };

    /**
     * method for filtering retain true handling logic
     * @param {string} topic mqtt topic
     * @param {object} message mqtt message object
     * @param {object} packet mqtt packet object
     */
    retainTrueLogic = (topic, message, packet) => {
        console.log('Retained msg: ', topic, '>', message);

        for (var i = 0; i < this.routes.length; i += 1) {
            if (this.routes[i].topic === topic) {
                if (this.routes[i].allowRetained == true) {
                    this.routes[i].handler(message);
                } else {
                    // Retained messages were not accepted
                }
            }
        }
    };
}

module.exports = MQTTRouter;

// TODO: Add an option to add new subscription / remove subscriptions to the route list even after init

class MQTTRouter {
    constructor(mqttConnection, routes, options, setup, onError) {
        this.mqttClient = mqttConnection;

        if (Array.isArray(routes)) {
            this.routes = routes;
        } else {
            this.routes = [
                {
                    topic: 'v1/',
                    handler: (topic, msg) => {
                        try {
                            var data = JSON.parse(msg);
                            console.log('Default Subscriber picked up the topic', data);
                        } catch (err) {
                            // TODO: use errorHandler
                            this.errorHandler(err);
                        }
                    },
                    allowRetained: true
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
                console.log('mqtt.error: ', err);
            };
        }
    }

    /**
     * method for starting the mqtt handler
     */
    start = () => {
        console.log('start fn');
        this.mqttClient.on('connect', () => {
            console.log('connect fn');
            this.handleRouteSubscriptions();
            if (this.setup !== null) {
                this.setup();
            }
        });

        this.mqttClient.on('error', (err) => {
            console.log('error fn');
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
     * method for handling messages on retain false subscription.
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
     * method for handling messages on retain true subscription.
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

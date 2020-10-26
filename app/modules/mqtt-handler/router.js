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
                            console.log('MQTT_Default Subscriber picked up the topic', data);
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
                console.log('MQTT_Error: ', err);
            };
        }
    }

    /**
     * method for starting the mqtt handler
     */
    start = () => {
        console.log('start fn');
        this.mqttClient.on('connect', () => {
            console.log('MQTT_Connecting...');
            this.handleRouteSubscriptions();
            if (this.setup !== null && this.setup !== undefined) {
                this.setup();
            }
        });

        this.mqttClient.on('error', (err) => {
            console.log('MQTT_Error fn');
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
            if(this.routes[i].subscribe != false){
                // subscribe at the beginning unless it is avoided by setting 'subscribe:false'
                this.mqttClient.subscribe(this.routes[i].topic, this.options);
                console.log('MQTT_Subscribed: ', this.routes[i].topic);
            }else{
                console.log('MQTT_NotSubscribed: ', this.routes[i].topic);
            }

        }
    };

    /**
     * method for filtering retain false handling logic
     * @param {string} topic mqtt topic
     * @param {object} message mqtt message object
     * @param {object} packet mqtt packet object
     */
    retainFalseLogic = (topic, message, packet) => {
        console.log('MQTT_Msg_Fresh: ', topic, '>', message);

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
        console.log('MQTT_Msg_Retained: ', topic, '>', message);

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

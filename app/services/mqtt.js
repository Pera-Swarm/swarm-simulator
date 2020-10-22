const mqttClient = require('mqtt');

const mqttConfig = require('../config/mqtt.config');
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

var robots;

mqtt.on('message', (topic, message, packet) => {
    // Only look for fresh messages
    if (packet.retain === false) {
        console.log(topic + ': ' + message);
        var msg = message.toString();

        // TODO: Implement this using MVC  ---------------------------------------

        if (topic == 'v1/robot/live') {
            // Process message and add robot if it isn't already in the robot list
        } else if (topic == 'v1/localization/info') {
        } else if (topic.startsWith('v1/sensor/')) {
            this.robots.sensors.handleTopic(mqtt, topic, msg);
        }
    } else {
        // Also accept older messages
    }
});

mqtt.on('error', function (err) {
    console.log('error: mqtt');
    console.log(err);
});

exports.start = (robots) => {
    this.robots = robots;

    mqtt.on('connect', () => {
        // Subscribe to sensor related topics
        this.robots.sensors.subscribe(mqtt);

        this.defaultSubscriptions();
        this.setup();
    });
};

exports.defaultSubscriptions = () => {
    const options = { qos: 2, rap: true, rh: true };

    // Add default subscriptions to here
    mqtt.subscribe('v1/robot/live', options);
    mqtt.subscribe('v1/localization/info', options);
};

exports.setup = () => {
    // Broadcast a discovery request for robots active
    mqtt.publish('v1/robot/msg/broadcast', 'ID? -1', () => {
        // Now each robot may reply with their IDs to the server
        // To the topic -> v1/robot/live
    });

    // Request localization details from the Localization System
    mqtt.publish('v1/localization/update', '', () => {
        // Now localization system will reply with the localization details to the server
        // To the topic -> v1/localization/info
    });
};
exports.client = mqtt;

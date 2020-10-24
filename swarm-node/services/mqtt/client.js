const mqttClient = require('mqtt');
const { mqttConfig } = require('../../config/');
const logger = require('../../logger/winston');

// const publisher = require("./publisher");
// const subscriber = require("./subscriber");
const sensorHandler = require('./handlers/sensor');

const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

mqtt.on('message', (topic, message, packet) => {
    logger.info(
        'services.mqtt.client: MQTT message received: topic("%s") message(%s)',
        topic,
        message,
        packet
    );
    // Only look for freash messages
    if (packet.retain === false) {
        // console.log(topic + ": " + message);

        if (topic == 'v1/controller/blower') {
            // mqttController.upload(message);
        } else if (topic == 'v1/controller/mist') {
            //mqttController.upload(message);
        } else if (topic == 'v1/controller/irrigation') {
            //mqttController.upload(message);
        } else if (topic == 'v1/controller/curtain') {
            //mqttController.upload(message);
        } else if (topic == 'v1/controller/sensorStation') {
            // mqttController.upload(message);
        }
    }
});

mqtt.on('error', function (err) {
    logger.error('services.mqtt.client: Error(%s)', error);
});

mqtt.start = () => {
    mqtt.on('connect', () => {
        const options = {
            qos: 2,
            rap: true,
            rh: true
        };

        mqtt.subscribe('v1/controller/upload', options);
        mqtt.subscribe('v1/controller/log', options);
        logger.info('services.mqtt.client: MQTT initial subscription');
    });
};

module.exports = mqtt;

const mqttClient = require('mqtt');
const mqttConfig = require('../../config/mqtt.config');
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

const { MQTTRouter } = require('./');

var router;

// Sample MQTT Error handler function
const SAMPLE_ON_ERROR_FN = (err) => {
    console.log('error: mqtt');
    console.log(err);
};

// Sample dynamic route list with handler functions
const SAMPLE_ROUTES = [
    {
        topic: 'v1/localization/info',
        handler: (mqtt, topic, msg) => {
            data = JSON.parse(msg);
            console.log('Localization info picked up the topic', data);
        }
    },
    {
        topic: 'v1/robot/msg/broadcast',
        handler: (mqtt, topic, msg) => {
            data = JSON.parse(msg);
            console.log('Broadcast picked up the topic', data);
        }
    }
];

// Sample MQTT Options
const SAMPLE_OPTIONS = { qos: 2, rap: true, rh: true };

// Sample setup function that runs on connect
const SAMPLE_SETUP_FN = () => {
    console.log('sample setup fn');
};

router = new MQTTRouter(
    mqtt,
    SAMPLE_ON_ERROR_FN,
    SAMPLE_ROUTES,
    SAMPLE_OPTIONS,
    SAMPLE_SETUP_FN
);
router.start();

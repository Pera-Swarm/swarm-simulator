// Base Models
const { Robot } = require('./robot');

// MQTT
const mqttClient = require('mqtt');
const mqttConfig = require('../config/mqtt.config');
const { options } = require('../config/mqtt.config');
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);
const { MQTTRouter } = require('../modules/mqtt-handler');

// Localization System
const { SimpleLocalizationSystem } = require('../modules/localization');

// cron
const cron = require('../services/cron.js');

// controllers
const { localizationRoutes, sensorRoutes, wrapper } = require('./controllers/mqtt/');
const { initRobots } = require('./robots/robots');

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
    },
    {
        topic: 'v1/sensor/distance',
        handler: (mqtt, topic, msg) => {
            data = JSON.parse(msg);
            console.log('Sensor picked up the topic', data);
        }
    }
];

class Swarm {
    constructor(setup) {
        this.loc_system = new SimpleLocalizationSystem();
        this.robots = initRobots();
        this.mqttRouter = new MQTTRouter(
            mqtt,
            wrapper(SAMPLE_ROUTES, this.robots),
            options,
            setup
        );
        this.mqttRouter.start();
        this.init();
    }

    /**
     * method for initializing the swarm
     */
    init = () => {
        cron.begin(mqtt);
        // const robot = new Robot(1);
        // this.robots.push(robot);
        console.log(this);
    };

    /**
     * method for adding a new Robot to the swarm
     * @param {id} robot_id
     * @param {created} created_time
     */
    addRobot = (id, created) => {
        const robot = new Robot(id);
    };
}

module.exports = { Swarm };

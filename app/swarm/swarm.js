// Base Models
// const { Robot } = require('./robot');

// MQTT
const mqttClient = require('mqtt');
const mqttConfig = require('../config/mqtt.config');
const { mqttOptions } = require('../config/mqtt.config');
const { MQTTRouter, publishToTopic, wrapper } = require('@pera-swarm/mqtt-router');

// MQTT Client module
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

// Localization System
const { SimpleLocalizationSystem } = require('../modules/localization');

// cron - currently not implemented
const cron = require('../services/cron.js');

// Controllers
const {
    localizationRoutes,
    sensorRoutes,
    controlRoutes
} = require('./controllers/mqtt/');
const { initRobots } = require('./robots/robots');

/**
 * @class Swarm Representation
 * @classdesc representing the customized swarm level functionality
 */
class Swarm {
    /**
     * @constructor Swarm constructor
     * @param {function} setup a fuction to run when the swarm object created
     */
    constructor(setup) {
        this.loc_system = new SimpleLocalizationSystem();
        this.robots = initRobots();
        this.mqttRouter = new MQTTRouter(
            mqtt,
            //myRoutes,
            wrapper([...controlRoutes, ...localizationRoutes, ...sensorRoutes], this),
            mqttOptions,
            setup
        );
        this.mqttRouter.start();
        this.init();
    }

    /**
     * method for initializing the swarm
     */
    init = () => {
        cron.begin(this, this.routine);
    };

    /**
     * method for handling the swarm routine
     * these tasks are scheduled with 'cron'
     */
    routine = () => {
        //console.log('CRON_');
        this.robots.prune(1, (robotId) => {
            //console.log('callback with robotId', robotId);
            this.publish('v1/robot/delete', { id: robotId });
        });
    };

    /**
     * method for publishing a message to a given topic
     * @param {string} topic mqtt topic
     * @param {string} message mqtt message object
     */
    publish = (topic, message) => {
        // Encode the JSON type messages
        if (typeof message === 'object') message = JSON.stringify(message);

        publishToTopic(mqtt, topic, message.toString(), mqttOptions, () => {
            console.log(`MQTT_Publish > ${message} to topic ${topic}`);
        });
    };
}

module.exports = { Swarm };

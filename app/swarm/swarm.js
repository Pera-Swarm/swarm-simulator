// Main pera-swarm library components
const {
    obstacleController,
    DEFAULT_ROBOT_ALIVE_INTERVAL
} = require('../../dist/pera-swarm');

// MQTT
const mqttClient = require('mqtt');
const mqttConfig = require('../config/mqtt.config');
const { MQTTRouter, publishToTopic, wrapper } = require('../../dist/mqtt-router');

// MQTT Client module
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

// Customized components
const { Robots } = require('./robots/robots');
const { schedulerService, SIXTY_SECONDS } = require('../services/cron.js');
const { EnvironmentController } = require('./controllers');

// const initialPublishers = [...obstacleInitialPublishers];

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
        this.robots = new Robots(this, this.mqttPublish);
        this.mqttRouter = new MQTTRouter(
            mqtt,
            wrapper([...this.robots.defaultSubscriptionRoutes], this),
            mqttConfig,
            setup
        );
        this.mqttRouter.start();

        // Cron Jobs with defined intervals
        schedulerService(this.prune, SIXTY_SECONDS);
        schedulerService(this.broadcastCheckALive);

        this.environment = new EnvironmentController(
            obstacleController(),
            './app/config/env.config.json'
        );

        console.log(this.environment.obstacleController);

        const initialPublishers = [
            ...this.environment.initialPublishers,
            ...this.robots.initialPublishers
        ];

        // Initial Publishers according to swarm configuration
        initialPublishers.forEach((publisher) => {
            this.mqttPublish(publisher.topic, publisher.data);
        });

        this.environment.createObstacles((obstacles) => {
            // Callback for publishing each obstacle into the environment
            this.mqttPublish('/obstacles', obstacles, {
                ...mqttConfig.options,
                retain: false
            });
        });
    }

    prune = () => {
        // console.log('Swarm_Prune');
        // Delete robots who are not active on last 5 mins (360 seconds)
        this.robots.prune(DEFAULT_ROBOT_ALIVE_INTERVAL);
    };

    broadcastCheckALive = () => {
        // console.log('Robot_ID_Broadcast');
        // Publish with retain:true, qos:atLeastOnce
        this.robots.broadcast('ID?', -1, { qos: 1, rap: true });
    };

    /**
     * method for publishing a message to a given topic
     * @param {string} topic mqtt topic
     * @param {string} message mqtt message object
     */
    mqttPublish = (topic, message, options = mqttConfig.mqttOptions) => {
        // Encode the JSON type messages
        if (typeof message === 'object') message = JSON.stringify(message);
        this.mqttRouter.pushToPublishQueue(topic, message.toString());
        // publishToTopic(mqtt, topic, message.toString(), options);
    };
}

module.exports = { Swarm };

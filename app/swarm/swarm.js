// Base Models
// const { Robot } = require('./robot');

// MQTT
const mqttClient = require('mqtt');
const mqttConfig = require('../config/mqtt.config');
const { mqttOptions } = require('../config/mqtt.config');
const { MQTTRouter, publishToTopic, wrapper } = require('../modules/mqtt-handler');

// MQTT Client module
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

// Localization System
const { SimpleLocalizationSystem } = require('../modules/localization');

// cron - currently not implemented
// const cron = require('../services/cron.js');

// Controllers
const { localizationRoutes, sensorRoutes } = require('./controllers/mqtt/');
const { initRobots } = require('./robots/robots');

const SAMPLE_ROUTES = [
    {
        topic: 'v1/localization/info',
        allowRetained: true,
        handler: (topic, msg) => {
            data = JSON.parse(msg);
            console.log('Localization info picked up the topic', data);
        }
    },
    {
        topic: 'v1/robot/msg/broadcast',
        allowRetained: true,
        handler: (topic, msg) => {
            data = JSON.parse(msg);
            console.log('Broadcast picked up the topic', data);
        }
    },
    {
        topic: 'v1/sensor/distance',
        allowRetained: true,
        handler: (topic, msg) => {
            data = JSON.parse(msg);
            console.log('Sensor picked up the topic', data);
        }
    }
];

// Class for representing the swarm level functionality
class Swarm {
    /**
     * Swarm constructor
     * @param {function} setup a fuction to run when the swarm object created
     */
    constructor(setup) {
        const myRoutes = [
            {
                topic: 'v1/gui/create',
                allowRetained: true,
                handler: (topic, msg) => {
                    //console.log('Creating > id:',msg.id,'x:',msg.x,'y:',msg.y);
                    this.robots.addRobot(msg.id);
                }
            }
        ];

        //console.log(wrapper(myRoutes, this.robots));

        this.loc_system = new SimpleLocalizationSystem();
        this.robots = initRobots();
        this.mqttRouter = new MQTTRouter(
            mqtt,
            //myRoutes,
            wrapper([...localizationRoutes, ...sensorRoutes], this),
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
        //cron.begin(mqtt);
        // const robot = new Robot(1);
        // this.robots.push(robot);
        //console.log(this);
    };

    /**
     * method for adding a new Robot to the swarm
     * @param {number} id robot id
     * @param {Date} created created time
     */
    // addRobot = (id, created) => {
    //     const robot = new Robot(id);
    // };

    /**
     * method for publishing a message to a given topic
     * @param {string} topic mqtt topic
     * @param {string} message mqtt message object
     */
    publish = (topic, message) => {
        publishToTopic(mqtt, topic, message, mqttOptions, () => {
            console.log(`publish message > ${message} to topic ${topic}`);
        });
    };
}

module.exports = { Swarm };

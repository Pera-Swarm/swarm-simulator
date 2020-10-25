const logger = require('./logger/winston');

// External modules
const mqttClient = require('mqtt');
const mqttConfig = require('./config/mqtt');
const { mqttOptions } = require('./config/mqtt');
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);
const { MQTTRouter, publishToTopic, wrapper } = require('../app/modules/mqtt-handler/');
const { Robot } = require('../app/modules/robot/');
const { defineBaseMode } = require('../app/modules/modes/');

// Internal modules
// const { move, moveSpecific, stop, reset } = require('./robot/controllers/index');
const { setup } = require('./robot/services/protocols');
const { robotRoutes } = require('./robot/controllers/mqtt/');

var robot;
var mqttRouter;

initiate = () => {
    robot = new Robot(1);
    mqttRouter = new MQTTRouter(
        mqtt,
        //myRoutes,
        wrapper([...robotRoutes], robot),
        mqttOptions
        // setup
    );
    mqttRouter.start();
};

loop = () => {
    if (robot.id === undefined) {
        logger.log('debug', 'main: ROBOT ID Registration initial');
        console.log(robot);
        setup.registerId((success, id) => {
            if (success) {
                robot.setId(id);
                logger.log('info', 'main: ROBOT ID Registration success (%s)', id);
                setup.startMQTT();
            } else {
                logger.log('warn', 'main: ROBOT ID Registration failed (%s)', id);
            }
        });
    } else {
        // console.log(robot);
        // coordinates = move(coordinates);
        // logger.info('main: Executing ROBOT(%s) instance with coordinates: %s', robotId, coordinates);
    }
};

defineBaseMode(initiate, loop, 100, 'swarm-node-instance-mode');

// var uuid =

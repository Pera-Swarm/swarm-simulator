const { v4: uuidv4 } = require('uuid');
const logger = require('./logger/winston');

// External modules
const mqttClient = require('mqtt');
const mqttConfig = require('./config/mqtt');
const { mqttOptions } = require('./config/mqtt');
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.options);

const { MQTTRouter, wrapper } = require('@pera-swarm/mqtt-router');
//const { MQTTRouter, wrapper } = require('../app/modules/mqtt-handler/');

const { Robot } = require('../app/modules/robot/');
const { defineBaseMode } = require('@pera-swarm/modes/');

// Internal modules
const {
    generateId,
    heartbeat,
    initial,
    localizationInfoUpdate,
    setup
} = require('./robot/services/protocols');

const { circular, linear } = require('./robot/controllers/patterns/');
const { robotRoutes } = require('./robot/controllers/mqtt/');

var robot;
var mqttRouter;
var robotId = generateId();
var uuid = uuidv4();

initiate = () => {
    robot = new Robot(robotId, 10, 0,0);

    mqttRouter = new MQTTRouter(
        mqtt,
        //myRoutes,
        wrapper([...robotRoutes], robot),
        mqttOptions
    );
    mqttRouter.start();
    initial(robot, mqtt, mqttOptions);
};

loop = () => {
    if (robot.id === undefined) {
        logger.log('debug', 'main: ROBOT ID Registration initial');
        //console.log(robot);
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
        linear(robot, () => {
            localizationInfoUpdate(robot, mqtt, mqttOptions);
        });
        /*logger.log(
        'info',
        'main: ROBOT(%s) instance coordinates: %s',
        robotId,
        robot.getCoordinates()
    );*/
        //heartbeat(robot, mqtt, mqttOptions);
    }
};

defineBaseMode(initiate, loop, 1000, 'swarm-node-instance-mode');

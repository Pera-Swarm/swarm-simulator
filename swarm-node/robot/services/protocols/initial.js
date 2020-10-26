const logger = require('../../../logger/winston');

const { MqttClient } = require('mqtt');
const { publishToTopic } = require('.././../../../app/modules/mqtt-handler');
const { Robot } = require('../../../../app/modules/robot');

const INITIAL_TASKS = 1;

const logStatus = (state) => {
    if (state === INITIAL_TASKS) {
        logger.log('debug', 'robot.services.protocols.initial: INITIAL SCRIPTS FINISHED');
    }
};

/**
 * method for running the initial protocol routine
 * @param {Robot} robot robot instance
 * @param {MqttClient} mqtt mqtt connection
 * @param {object} mqttOptions mqtt options object
 */
const initial = (robot, mqtt, mqttOptions) => {
    var state = 0;
    logger.log('debug', 'robot.services.protocols.initial: INITIAL SCRIPTS STARTED');
    const message = {
        id: robot.id,
        heading: robot.coordinate.heading,
        x: robot.coordinate.x,
        y: robot.coordinate.y
    };
    publishToTopic(mqtt, 'v1/robot/create', JSON.stringify(message), mqttOptions, () => {
        state += 1;
        logger.log(
            'debug',
            'robot.services.protocols.initial.gui.create: GUI Create (%s) success',
            message
        );
        logStatus(state);
    });
};

module.exports = {
    initial
};

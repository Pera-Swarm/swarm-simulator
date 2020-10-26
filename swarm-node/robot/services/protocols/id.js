const logger = require('../../../logger/winston');

const { MqttClient } = require('mqtt');
const { publishToTopic } = require('.././../../../app/modules/mqtt-handler');
const { Robot } = require('../../../../app/modules/robot');

/**
 * method for generaring a random number for id
 * this will return a number between the integers 255 and 65535
 */
function generateId() {
    logger.log('debug', 'robot.services.protocols.id.generateId: ');
    return Math.floor(Math.random() * (65535 - 255 + 1)) + 255;
}

/**
 * method for sending a hearbeat message
 * @param {Robot} robot robot instance
 * @param {MqttClient} mqtt mqtt connection
 * @param {object} mqttOptions mqtt options object
 */
const heartbeat = (robot, mqtt, mqttOptions) => {
    const message = {
        id: robot.id,
        timestamp: Date.now()
    };
    publishToTopic(mqtt, 'v1/robot/live', JSON.stringify(message), mqttOptions, () => {
        logger.log(
            'debug',
            'robot.services.protocols.id.heartbeat: Heartbeat (%s) success',
            message
        );
    });
};

module.exports = {
    generateId,
    heartbeat
};

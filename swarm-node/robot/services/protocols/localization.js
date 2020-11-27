const logger = require('../../../logger/winston');

const { MqttClient } = require('mqtt');
const { publishToTopic } = require('@pera-swarm/mqtt-router');
const { Robot } = require('../../../../app/modules/robot');

/**
 * method for sending the localization info
 * @param {Robot} robot robot instance
 * @param {MqttClient} mqtt mqtt connection
 * @param {object} mqttOptions mqtt options object
 */
const localizationInfoUpdate = (robot, mqtt, mqttOptions) => {
    const message = {
        id: robot.id,
        heading: robot.coordinate.heading,
        x: robot.coordinate.x,
        y: robot.coordinate.y
    };
    publishToTopic(
        mqtt,
        'v1/localization/info',
        JSON.stringify([message]),
        mqttOptions,
        () => {
            logger.log(
                'debug',
                'robot.services.protocols.localization.localizationInfoUpdate: Heartbeat (%s) success',
                message
            );
        }
    );
};

module.exports = {
    localizationInfoUpdate
};

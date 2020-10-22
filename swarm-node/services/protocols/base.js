const { client } = require('../mqtt/');
const logger = require('../../logger/winston');

const publishSensorReadings = () => {
    logger.info('services.protocols.base.publishSensorReadings: ');
};

module.exports = {
    publishSensorReadings
};

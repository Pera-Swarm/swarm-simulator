const logger = require('../../../logger/winston');
const { Robot } = require('../../../../app/modules/robot');

/**
 * method initial
 * @param {Robot} robot robot instance
 */
const initial = (robot) => {
    logger.log('debug', 'robot.controllers.protocols.initial.initial: robot(%s)', robot);
};

module.exports = {
    initial
};

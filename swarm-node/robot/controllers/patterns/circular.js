const logger = require('../../../logger/winston');

const circular = (robot) => {
    logger.log('debug', 'controllers.patterns.circular: ', robot);
};

module.exports = {
    circular
};

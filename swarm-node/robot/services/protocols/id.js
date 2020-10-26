const logger = require('../../../logger/winston');

/**
 * method for generaring a random number for id
 * this will return a number between the integers 255 and 65535
 */
function generateId() {
    return Math.floor(Math.random() * (65535 - 255 + 1)) + 255;
}

const heartbeat = (robot, mqtt, mqttOptions) => {
};
module.exports = {
    generateId,
    heartbeat
};

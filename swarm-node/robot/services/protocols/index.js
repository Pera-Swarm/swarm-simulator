const { generateId, heartbeat } = require('./id');
const { localizationInfoUpdate } = require('./localization');
const setup = require('./setup');

module.exports = {
    generateId,
    heartbeat,
    localizationInfoUpdate,
    setup
};

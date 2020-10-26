const { generateId, heartbeat } = require('./id');
const { initial } = require('./initial');
const { localizationInfoUpdate } = require('./localization');
const setup = require('./setup');

module.exports = {
    generateId,
    heartbeat,
    initial,
    localizationInfoUpdate,
    setup
};

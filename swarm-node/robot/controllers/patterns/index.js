const logger = require('../../../logger/winston');
const { circular } = require('./circular');
const { linear } = require('./linear');

module.exports = {
    circular,
    linear
};

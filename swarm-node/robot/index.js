const { v4: uuidv4 } = require('uuid');
const Localization = require('./modules/localization');
const Sensors = require('./modules/sensors');
const Ledstrip = require('./modules/ledstrip');
const logger = require('../logger/winston');

class Robot {
    constructor() {
        this.id = undefined;
        this.uuid = uuidv4();
        this.coordinates = new Localization();
        this.sensors = new Sensors();
        this.ledstrip = new Ledstrip();
        this.epoch = Date.now();
        this.timestamp = new Date();
        logger.log(
            'debug',
            'Initiated ROBOT instance with id:%s uuid:(%s) coordinates: %s on %s',
            this.id,
            this.uuid,
            this.coordinates.getCoordinates(),
            this.timestamp
        );
    }

    /**
     * Get id
     */
    getId = () => {
        logger.log('debug', 'robot: getId()');
        return this.id;
    };

    /**
     * Set id
     * @param {id} id
     */
    setId = (id) => {
        logger.log('debug', 'robot: setId(%s)', id);
        this.id = id;
    };

    /**
     * Get coordinates
     */
    getCoordinates = () => {
        logger.log('debug', 'robot: getCoordinates()');
        return this.coordinates;
    };

    /**
     * Set coordinates
     * @param {coordinates} coordinates
     */
    setCoordinates = (coordinates) => {
        logger.log('debug', 'robot: setCoordinates(%s)', coordinates);
        this.coordinates = coordinates;
    };

    /**
     * Get sensors
     */
    getSensors = () => {
        logger.log('debug', 'robot: getSensors()');
        return this.sensors;
    };

    /**
     * Set sensors
     * @param {sensors} sensors
     */
    setSensors = (sensors) => {
        logger.log('debug', 'robot: setSensors(%s)', sensors);
        this.sensors = sensors;
    };

    /**
     * Get ledstrip
     */
    getLedstrip = () => {
        logger.log('debug', 'robot: getLedstrip()');
        return this.ledstrip;
    };

    /**
     * Set ledstrip
     * @param {ledstrip} ledstrip
     */
    setLedstrip = (ledstrip) => {
        logger.log('debug', 'robot: setLedstrip(%s)', ledstrip);
        this.ledstrip = ledstrip;
    };
}

module.exports = Robot;

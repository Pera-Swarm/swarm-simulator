const logger = require('../../../logger/winston');

class Ledstrip {
    constructor() {
        this.led0 = 0;
        this.led1 = 0;
        this.led2 = 0;
        logger.log('debug', 'robot.modules.ledstrip: Initial Ledstrip');
    }

    /**
     * Get led strip values
     */
    getValues = () => {
        return {
            led0: this.led0,
            led1: this.led1,
            led2: this.led2
        };
    };

    /**
     * Light Up All Leds
     */
    lightenAll = () => {
        logger.log('debug', 'robot.modules.ledstrip.lightenAll: ');
    };
}

module.exports = Ledstrip;

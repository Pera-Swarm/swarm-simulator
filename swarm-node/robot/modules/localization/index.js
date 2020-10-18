const logger = require('../../../logger/winston');

class Localization {
    
    constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.head = 0;
        logger.log('debug', 'robot.modules.localization: Initial Localization');
    }

    /**
     * Set coordinates
     */
    setCoordinates = (x, y, head) => {
        this.x = x;
        this.y = y;
        this.head = head;
        logger.log('debug', 'robot.modules.localization: setCoordinates(%s, %s, %s)', x, y, head);
    }

    /**
     * Set extended coordinates
     */
    setCoordinatesEx = (x, y, z, head) => {
        this.x = x;
        this.y = y;
        this.z = z;
        this.head = head;
        logger.log('debug', 'robot.modules.localization: setCoordinatesEx(%s, %s, %s, %s)', x, y, z, head);
    }

    /**
     * Get coordinates
     */
    getCoordinates = () => {
        logger.log('debug', 'robot.modules.localization: getCoordinates()');
        return {
            x: this.x,
            y: this.y,
            head: this.head
        }
    }

    /**
     * Get extended coordinates
     */
    getCoordinatesEx = () => {
        logger.log('debug', 'robot.modules.localization: getCoordinatesEx()');
        return {
            x: this.x,
            y: this.y,
            z: this.z,
            head: this.head
        }
    }

    /**
     * Reset coordinates
     */
    reset = () => {
        logger.log('debug', 'robot.modules.localization: reset()');
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.head = 0;
    }
}

module.exports = Localization

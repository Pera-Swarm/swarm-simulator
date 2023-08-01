let cron = require('node-cron');
const {
    DEFAULT_SWARM_PRUNE_INTERVAL,
    DEFAULT_SWARM_PRUNE_INTERVAL_EXTENDED
} = require('../../dist/pera-swarm');

// Scheduler service class
class Scheduler {
    /**
     * Cron Service
     * @param {Function} function routing
     * @param {number} interval interval
     */
    constructor(routine, interval) {
        this._routine = routine;
        this._interval = interval;
        cron.schedule(
            this._interval,
            () => {
                this._routine();
            },
            {
                scheduled: true,
                timezone: 'Asia/Colombo'
            }
        );
    }
}

/**
 * get scheduler instance
 * @param {Function} routine
 * @param {string} interval
 */
const schedulerService = (routine, interval = this.THIRTY_SECONDS) => {
    if (routine !== undefined && typeof routine === 'function') {
        routine();
        new Scheduler(routine, interval);
    } else {
        console.error('Scheduler function not specified');
    }
};

/**
 * generates a cron interval in given seconds
 * @param {string} frequency in seconds
 * @returns {string} interval
 */
const secondsInterval = (freq) => {
    return '*/' + freq + ' * * * * *';
};

/**
 * Generates a cron interval in given minutes
 * @param {string} frequency in minutes
 * @returns {string} interval
 */
const minutesInterval = (freq) => {
    return '*/' + freq + ' * * * *';
};

// Service level interval declaration
const THIRTY_SECONDS = secondsInterval(DEFAULT_SWARM_PRUNE_INTERVAL);
const SIXTY_SECONDS = secondsInterval(DEFAULT_SWARM_PRUNE_INTERVAL_EXTENDED);

module.exports.Scheduler = Scheduler;
module.exports.schedulerService = schedulerService;
module.exports.secondsInterval = secondsInterval;
module.exports.minutesInterval = minutesInterval;
module.exports.THIRTY_SECONDS = THIRTY_SECONDS;
module.exports.SIXTY_SECONDS = SIXTY_SECONDS;

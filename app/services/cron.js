var cron = require('node-cron');

exports.begin = (interval, routine) => {
    // initerval in seconds

    cron.schedule(
        interval,
        () => {
            routine();
        },
        {
            scheduled: true,
            timezone: 'Asia/Colombo'
        }
    );
};

/**
 * Generates a cron interval called in given seconds
 * @param {freq} frequency in seconds
 */
exports.secondsInterval = (freq) => {
    return '*/' + freq + ' * * * * *';
};

/**
 * Generates a cron interval called in given minutes
 * @param {freq} frequency in minutes
 */
exports.minutesInterval = (freq) => {
    return '*/' + freq + ' * * * *';
};

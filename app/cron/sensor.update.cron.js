var cron = require('node-cron');

/*
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# │ │ │ │ │ │
# * * * * * *

*/

// TODO: rearrange maybe??

module.exports.update = (mqtt, id, time) => {
    const interval = '*/10 * * * * *'; // every 10 seconds

    cron.schedule(
        interval,
        () => {
            setTimeout(() => {
                //mqtt.client.publish('topic', 'data');
            }, time * 10);
        },
        {
            scheduled: true,
            timezone: 'Asia/Colombo'
        }
    );
};

var cron = require('node-cron');

// TODO: add env variable for interval
const interval = '*/10 * * * * *'; // every 10 seconds

exports.begin = (swarm, routine) => {
    this.swarm = swarm;

    cron.schedule(
        interval,
        () => {
            console.log(
                'Cron Scheduler',
                this.swarm.robots.updated,
                this.swarm.robots.getSize()
            );
            routine();
        },
        {
            scheduled: true,
            timezone: 'Asia/Colombo'
        }
    );
};

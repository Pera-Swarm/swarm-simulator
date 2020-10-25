// sensor routes and handlers
// Note: 'robot' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/robot/msg/broadcast',
        allowRetained: true,
        handler: (msg, robot) => {
            console.log('robot broadcast handler:', msg);
            console.log('robot:', robot);
            console.log('sensor readings:', robot.getSensorReadings());
        }
    }
];

module.exports = routes;

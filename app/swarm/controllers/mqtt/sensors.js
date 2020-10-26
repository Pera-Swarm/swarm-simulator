// sensor routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/sensor/distance',
        allowRetained: true,
        handler: (msg, swarm) => {
            console.log('sensor handler', msg);
            console.log(msg);
            // console.log(swarm);

            // TODO: swarm.updateSensor(msg.id, 'distance');
            // var sensor = this.robots.list[msg.id].sensors.distance;

            swarm.publish('v1/robot/live', 'sample msg sen');
        }
    }
];

module.exports = routes;

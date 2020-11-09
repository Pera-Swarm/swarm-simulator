// sensor routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/sensor/distance',
        allowRetained: true,
        subscribe: true,
        handler: (msg, swarm) => {
            console.log('MQTT_Sensor: Distance_Handler: ', msg);
            var robot = swarm.robots.findRobotById(msg.id);
            if (robot !== -1) {
                var sensor = robot.sensors.distance;
                var returnValue = sensor.syncReading(msg.distance);
                swarm.publish('v1/sensor/distance/' + robot.id, returnValue);
            } else {
                // No robot found. Just echo the message
                // TODO: register the robot into system
                // swarm.publish('v1/sensor/distance/' + msg.id, msg.distance);
            }
        }
    }
];

module.exports = routes;

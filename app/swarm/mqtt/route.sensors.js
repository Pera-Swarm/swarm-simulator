// sensor routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'sensor/distance',
        allowRetained: true,
        subscribe: true,
        handler: (msg, swarm) => {
            //console.log('MQTT_Sensor:Distance_Handler: ', msg);

            var robot = swarm.robots.findRobotById(msg.id);
            if (robot != -1) {
                swarm.robots.distanceSensor.getReading(robot, (dist) => {
                    console.log('MQTT_Sensor:Distance_Handler', dist);
                });
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot
                // TODO: register the robot into system

                console.log('MQTT_Sensor:Distance_Handler', 'Robot not found');
                //console.log(swarm.robots.robotList);
            }
        }
    },
    {
        topic: 'sensor/color',
        allowRetained: true,
        subscribe: true,
        handler: (msg, swarm) => {
            console.log('MQTT_Sensor:Color_Handler: ', msg);

            var robot = swarm.robots.findRobotById(msg.id);

            if (robot != undefined) {
                //var returnValue = robot.sensors.distance.syncReading(msg.distance);
                swarm.mqttPublish('sensor/color/' + robot.id, returnValue);
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot
                // TODO: register the robot into system
                swarm.mqttPublish('sensor/color/' + msg.id, msg.distance);
            }
        }
    }
];

module.exports = routes;

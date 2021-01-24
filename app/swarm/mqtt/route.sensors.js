// sensor routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'sensor/distance',
        type: 'JSON',
        allowRetained: true,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Robot sends its own distance sensor readings to the simulator,
            // as reply to the ‘{channal}/sensor/distance/{robotID}/?’ request
            console.log('MQTT.Sensor: sensor/distance', msg);

            let robot = swarm.robots.findRobotById(msg.id);
            if (robot != -1) {
                swarm.robots.distanceSensor.getReading(robot, (dist) => {
                    console.log('MQTT:Sensor:Distance_Handler', dist);
                });
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot

                console.log('MQTT_Sensor:Distance_Handler', 'Robot not found');
                //console.log(swarm.robots.robotList);
            }
        }
    },
    {
        topic: 'sensor/color',
        type: 'JSON',
        allowRetained: true,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Robot sends its own sensor readings to the server,
            // as a reply to the ‘{channal}/sensor/color/{robotID}/?’ request
            console.log('MQTT.Sensor: sensor/color', msg);

            let robot = swarm.robots.findRobotById(msg.id);
            if (robot != undefined) {
                // TODO: implement return value
                const returnValue = 10; //robot.sensors.distance.syncReading(msg.distance);
                swarm.mqttPublish('sensor/color/' + robot.id, returnValue);
            } else {
                // No robot found. Just echo the message, because this is a blocking call for the robot
                swarm.mqttPublish('sensor/color/' + msg.id, msg.distance);
            }
        }
    },
    {
        topic: 'sensor/proximity',
        type: 'JSON',
        allowRetained: true,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Robot sends its own sensor readings to the server,
            // as a reply to the ‘{channal}/sensor/proximity/{robotID}/?’ request
            console.log('MQTT.Sensor: sensor/proximity', msg);

            // No actions need to be here,
            // since there no any physical sensor for now.
        }
    }
];

module.exports = routes;

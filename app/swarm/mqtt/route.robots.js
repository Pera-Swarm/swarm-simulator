// robot routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'robot/live',
        type: 'JSON',
        allowRetained: false,
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Heartbeat signal from the robots to server
            // console.log('MQTT.Robot: robot/live', msg);

            var robot = swarm.robots.findRobotById(msg.id);
            if (robot !== -1) {
                const heartbeat = robot.updateHeartbeat();
                //console.log('Heatbeat of the robot', msg, 'is updated to', heartbeat);
            } else {
                // No robot found.
                swarm.robots.createIfNotExists(msg.id, () => {
                    //console.log('A robot created', msg.id);
                });
            }
        }
    },
    {
        topic: 'robot/create',
        type: 'JSON',
        allowRetained: true, // TODO: only in DEV mode
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Create a robot on simulator
            console.log('MQTT.Robot: robot/create', msg);

            const { id, heading, x, y } = msg;
            const resp = swarm.robots.addRobot(id, heading, x, y);
        }
    },
    {
        topic: 'robot/delete',
        type: 'JSON',
        allowRetained: false,
        subscribe: false,
        publish: true,
        handler: (msg, swarm) => {
            // This will instruct GUI to delete the robot instance
            console.log('MQTT.Robot: robot/delete', msg);

            // No actions need to be here, just for representation
        }
    },
    {
        topic: 'robot/msg/broadcast',
        type: 'JSON',
        allowRetained: false,
        subscribe: false,
        publish: true,
        handler: (msg, swarm) => {
            // This will instruct GUI to delete the robot instance
            // console.log('MQTT.:Robot: robot/msg/broadcast', msg);
            // No actions need to be here, just for representation
            // This is called by the server at the beginning
            // with the value of 'ID? -1'
            // and the robots will send their heartbeat pules to the server
            /*
            Message Types
            ---------------
            ID? -1
            MODE 1
            START -1
            STOP -1
            RESET -1
            */
        }
    }
];

module.exports = routes;

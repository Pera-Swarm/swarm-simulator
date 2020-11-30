// control routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/test',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            //console.log('UpdatingHeartbeat > id:',msg.id,'x:',msg.x,'y:',msg.y);
            const id = msg.id;

            console.log(msg);
            var robot = swarm.robots.findRobotById(id);

            const reading = swarm.robots.distanceSensor.viewReading(robot);
            console.log('Test: ', reading);
            //swarm.robots.prune(10);
        }
    },
    {
        topic: 'v1/robot/live',
        allowRetained: false,
        subscribe: true,
        type: 'String',
        handler: (msg, swarm) => {
            //console.log('UpdatingHeartbeat > id:',msg.id,'x:',msg.x,'y:',msg.y);

            const { id } = msg;
            var robot = swarm.robots.findRobotById(id);

            if (robot !== -1) {
                const heartbeat = robot.updateHeartbeat();
                console.log('Heatbeat of the robot', msg, 'is updated to', heartbeat);
            } else {
                // No robot found.
                // TODO: create robot if not already exists
            }
        }
    },
    {
        topic: 'v1/robot/create',
        allowRetained: true, // TODO: only in DEV mode
        subscribe: true,
        publish: false,
        handler: (msg, swarm) => {
            // Only create fresh robot units
            const { id, heading, x, y } = msg;
            const resp = swarm.robots.addRobot(id, heading, x, y);

            console.log('MQTT_Robot:Create:', id);
        }
    },
    {
        topic: 'v1/robot/delete',
        allowRetained: false,
        subscribe: false,
        publish: true,
        handler: (msg, swarm) => {
            // This will instruct GUI to delete the robot instance
            console.log('MQTT_Robot:Delete', msg.id);
        }
    },
    {
        topic: 'v1/robot/msg/broadcast',
        allowRetained: false,
        subscribe: false,
        publish: true,
        handler: (msg, swarm) => {
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

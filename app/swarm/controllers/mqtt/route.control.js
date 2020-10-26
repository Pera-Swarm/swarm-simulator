// control routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/robot/live',
        allowRetained: false,
        handler: (msg, swarm) => {
            //console.log('UpdatingHeartbeat > id:',msg.id,'x:',msg.x,'y:',msg.y);
            var robot = swarm.robots.findRobotById(msg.id);

            if (robot != undefined) {
                const heartbeat = robot.updateHeartbeat();
                console.log('Heatbeat of the robot', msg.id, 'is updated to', heartbeat);
            } else {
                // No robot found.
                // TODO: create robot if not already exists
            }
        },
        subscribe: true
    },
    {
        topic: 'v1/robot/create',
        allowRetained: true,
        handler: (msg, swarm) => {
            //console.log('Creating > id:',msg.id,'x:',msg.x,'y:',msg.y);
            swarm.robots.addRobot(msg.id, msg.x, msg.y, msg.heading);
        },
        subscribe: true
    },
    {
        topic: 'v1/robot/msg/broadcast',
        allowRetained: false,
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
        },
        subscribe: false
    }
];

module.exports = routes;

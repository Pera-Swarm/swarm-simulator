// control routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/robot/live',
        allowRetained: false,,
        subscribe: true,
        handler: (msg, swarm) => {
            //console.log('UpdatingHeartbeat > id:',msg.id,'x:',msg.x,'y:',msg.y);
            var robot = swarm.robots.findRobotById(msg.id);

            if (robot != undefined) {
                const heartbeat = robot.updateHeartbeat();
                console.log('Heatbeat of the robot', msg.id, 'is updated to', heartbeat);
            } else {
                // No robot found.
            }
        }
    },
    {
        topic: 'v1/robot/create',
        allowRetained: true,,
        subscribe: true,
        handler: (msg, swarm) => {
            //console.log('Creating > id:',msg.id,'x:',msg.x,'y:',msg.y);
            swarm.robots.addRobot(msg.id, msg.x, msg.y, msg.heading);
        }
    }
];

module.exports = routes;

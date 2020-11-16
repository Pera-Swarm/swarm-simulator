// control routes and handlers
// Note: 'swarm' argument will be added via wrapper

const routes = [
    {
        topic: 'v1/robot/live',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            //console.log('UpdatingHeartbeat > id:',msg.id,'x:',msg.x,'y:',msg.y);
            const { id } = msg;
            var robot = swarm.robots.findRobotById(id);

            if (robot !== -1) {
                const heartbeat = robot.updateHeartbeat();
                console.log('Heatbeat of the robot', msg.id, 'is updated to', heartbeat);
            } else {
                // No robot found.
            }
        }
    },
    {
        topic: 'v1/robot/create',
        allowRetained: false,
        subscribe: true,
        handler: (msg, swarm) => {
            // Only create fresh robot units
            const { id, heading, x, y } = msg;
            swarm.robots.addRobot(id, heading, x, y);
        }
    }
];

module.exports = routes;

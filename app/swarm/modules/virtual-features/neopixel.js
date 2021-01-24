class NeoPixel {
    
    constructor(mqttPublish) {
        this.publish = mqttPublish;
    }

    updateNeoPixel = (robot, R, G, B) => {
        const id = robot.id;
        const msg = `${R} ${G} ${B}`;

        // Store in robot data structure
        robot.setData('neopixel', { R, G, B });

        // Info the robot about update
        this.publish(`output/neopixel/${id}`, msg);
    };

    defaultSubscriptions = () => {
        return [
            {
                topic: 'output/neopixel',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: false,
                handler: (msg, swarm) => {
                    // Robots can info the server about neopixel strip through this topic
                    // console.log('MQTT.Neopixel: output/neopixel', msg);

                    const { id, R, G, B } = msg;
                    const robot = swarm.robots.findRobotById(id);

                    swarm.robots.createIfNotExists(id, () => {
                        // Update the setting in robot data structure
                        robot.setData('neopixel', { R, G, B });

                        //console.log(robot);
                        //this.updateNeoPixel(robot, R, G, B);
                    });
                }
            }
        ];
    };
}
module.exports = { NeoPixel };

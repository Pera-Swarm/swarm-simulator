const { AbstractAgentEmulator } = require('../../../../dist/pera-swarm');

class NeoPixelAgent extends AbstractAgentEmulator {
    constructor(mqttPublish) {
        super(null, mqttPublish);
    }

    update = (robot, R, G, B) => {
        const id = robot.id;
        const msg = `${R} ${G} ${B}`;

        // Store in robot data structure
        robot.setData('neopixel', { R, G, B });

        // Info the robot visualizer about update, OPTIONAL
        //this.publish(`output/neopixel/${id}`, msg);
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
                    // console.log('MQTT_Neopixel: output/neopixel', msg);

                    const { id, R, G, B } = msg;
                    const robot = swarm.robots.findRobotById(id);

                    if (robot != -1) {
                        this.update(robot, R, G, B);
                    } else {
                        // No robot found, no return message
                        console.error(
                            'MQTT_Neopixel: output/neopixel',
                            msg,
                            '| Robot not found'
                        );
                    }
                }
            }
        ];
    };
}

module.exports = { NeoPixelAgent };

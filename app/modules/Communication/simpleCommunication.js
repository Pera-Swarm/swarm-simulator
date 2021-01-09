const { Communication } = require('./communication.js');

class SimpleCommunication extends Communication {
    constructor(robots, mqttPublish, maxDistance, debug) {
        super(robots, mqttPublish, maxDistance, debug);
    }

    broadcast = (robotId, message, callback) => {
        if (robotId === undefined) throw new TypeError('robotId unspecified');
        if (message === undefined) throw new TypeError('message unspecified');

        const robots = this.robots.getCoordinatesAll();
        const thisRobot = this.robots.getCoordinatesById(robotId);
        var receivers = 0;

        robots.forEach((robot, index) => {
            if (robot.id != thisRobot.id) {
                const distCheck = this.#distanceCheck(
                    this._getDistance(thisRobot, robot)
                );

                if (distCheck) {
                    // within the distance range, so send the messaage

                    receivers++;
                    if (this.debug) console.log(`robot #${robot.id}: pass`);

                    this.publish(`communication/${robot.id}`, message);
                }
            }
        });
        if (callback != undefined) callback({ receivers: receivers });
    };

    /**
    * method contains the default subscription topics of the module.
    * Should be add to mqttRouter once module is created
    */
    defaultSubscriptions = () => {
        return [{
            topic: 'comm/out/simple',
            allowRetained: false,
            subscribe: true,
            handler: (msg, this) => {
                // this = SimpleCommunication
                console.log(`Comm:Simple > robot ${msg.id} transmitted ${msg.msg}`);
                this.broadcast(msg.id, msg.msg,console.log('Simple broadcast');)
            }
        }];
    }

    #distanceCheck = (dist) => {
        return dist <= this.maxDistance;
    };

}


}
module.exports = { SimpleCommunication };

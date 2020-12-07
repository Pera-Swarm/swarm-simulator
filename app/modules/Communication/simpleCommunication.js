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
                const distCheck = this.#distanceCheck(this._getDistance(thisRobot, robot));

                if (distCheck) {
                    // within the distance range, so send the messaage

                    receivers++;
                    if(this.debug) console.log(`robot #${robot.id}: pass`);

                    this.publish(`v1/communication/${robot.id}`, message);
                }
            }
        });
        if (callback != undefined) callback({ receivers: receivers });
    };

    #distanceCheck = (dist) => {
        return (dist <= this.maxDistance);
    };
}
module.exports = { SimpleCommunication };

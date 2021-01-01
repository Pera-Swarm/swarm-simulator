const { abs } = require('mathjs');
const { Communication } = require('./communication.js');

class DirectedCommunication extends Communication {
    constructor(robots, mqttPublish, maxDistance, angleThreshold = 30, debug) {
        super(robots, mqttPublish, maxDistance, debug);
        this.angleThreshold = angleThreshold;

        //console.log('DirectedCommunication:Debug:',this.debug);
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
                const angleCheck = this.#angleCheck(
                    thisRobot.heading,
                    this._getAngle(thisRobot, robot)
                );

                if (distCheck && angleCheck) {
                    // within the distance range & angle threshold, so send the messaage

                    receivers++;
                    if (this.debug) console.log(`robot #${robot.id}: pass`);

                    this.publish(`v1/communication/${robot.id}`, message);
                }
            }
        });

        if (callback != undefined) callback({ receivers: receivers });
    };

    #distanceCheck = (dist) => {
        return dist <= this.maxDistance;
    };

    #angleCheck = (heading, angle) => {
        // Get the absolute difference between robot heading and target robot's absolute angle
        var difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;

        if (this.debug)
            console.log(`heading: ${heading}, angle:${angle}, diff:${difference}`);

        return abs(difference) <= this.angleThreshold / 2;
    };
}
module.exports = { DirectedCommunication };

const { abs, sqrt, pow, round, atan2 } = require('mathjs');

class Communication {
    constructor(robots, mqttPublish, maxDistance = 100, debug = false) {
        if (robots === undefined) throw new TypeError('robots unspecified');
        if (mqttPublish === undefined) throw new TypeError('mqttPublish unspecified');

        this.robots = robots;
        this.publish = mqttPublish;
        this.maxDistance = maxDistance;
        this.debug = debug;
    }

    // Abstract function
    broadcast = (robotId, message, callback) => {
        throw new Error(
            'This is an abstract function and you need to implement this function'
        );
    };

    // Internal use only -------------------------------------------------------

    _getDistance = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return round(sqrt(pow(xDiff, 2) + pow(yDiff, 2)), 2);
    };

    _getAngle = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return this._normalizedAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
    };

    _normalizedAngle = (a) => {
        let b = (a + 180) % 360;
        if (b <= 0) b += 360;
        b = b - 180;
        return round(b, 2);
    };
}

module.exports = { Communication };

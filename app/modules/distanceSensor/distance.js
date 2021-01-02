const { abs, round, cos, sin } = require('mathjs');

class DistanceSensor {
    /* ------------------------------------------------------
    Arena coordinate system (top view)

    P1   L4  P2
    ┍━━━┑
    L3 ┃   ┃ L1
    ┕━━━┛
    P3  L2  P4

    Axises: ↑ Y, → X

    ------------------------------------------------------ */

    constructor(arena, mqttPublish) {
        this.arena = arena;
        this.publish = mqttPublish;
    }

    getReading = (robot, callback) => {
        const { x, y, heading } = robot.getCoordinates();

        robot.updateHeartbeat();
        console.log(x, y, heading);
        var dist = round(this.#getBorderDistance(x, y, heading) * 10) / 10;

        this.publish(`sensor/distance/${robot.id}`, dist);
        this.setReading(robot, dist);

        if (callback != undefined) callback(dist);
    };

    setReading = (robot, value) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        return robot.setData('distance', Number(value));
    };

    viewReading = (robot) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        const dist = robot.getData('distance');
        return dist != undefined ? dist : NaN;
    };

    // Internal use only -------------------------------------------------------

    #normalizedAngle = (a) => {
        let b = (a + 180) % 360;
        if (b <= 0) b += 360;
        b = b - 180;
        return b;
    };

    #getBorderDistance = (x, y, heading) => {
        //console.log( this.arena);

        const { xMin, xMax, yMin, yMax } = this.arena;
        var heading = this.#normalizedAngle(heading);

        var p1 = { x: xMax, y: yMin }; // lower right
        var p2 = { x: xMax, y: yMax }; // upper right
        var p3 = { x: xMin, y: yMin }; // lower left
        var p4 = { x: xMin, y: yMax }; // upper right

        // x and y interchanged due to coordinate system transform ???
        var angle1 = (-1 * Math.atan2(p1.y - y, p1.x - x) * 180) / Math.PI;
        var angle2 = (-1 * Math.atan2(p2.y - y, p2.x - x) * 180) / Math.PI;
        var angle3 = (-1 * Math.atan2(p3.y - y, p3.x - x) * 180) / Math.PI;
        var angle4 = (-1 * Math.atan2(p4.y - y, p4.x - x) * 180) / Math.PI;

        //console.log(`Pos x:${x} y:${y} Heading:${heading}`);
        //console.log('Ang:',angle1, angle2, angle3, angle4);

        if (heading >= 0) {
            // Positive angles, Counter Clockwise

            if (heading <= angle1) {
                //console.log('L1');
                return this.#getLineDistance(x, y, heading, 1);
            } else if (heading <= angle3) {
                //console.log('L4');
                return this.#getLineDistance(x, y, heading, 4);
            } else {
                //console.log('L3');
                return this.#getLineDistance(x, y, heading, 3);
            }
        } else {
            // Minus angles, Clockwise

            if (heading >= angle2) {
                return this.#getLineDistance(x, y, heading, 1);
            } else if (heading >= angle4) {
                return this.#getLineDistance(x, y, heading, 2);
            } else {
                return this.#getLineDistance(x, y, heading, 3);
            }
        }

        return 0;
    };

    #getLineDistance = (x, y, heading, line) => {
        const { xMin, xMax, yMin, yMax } = this.arena;
        const theta = heading * (Math.PI / 180);

        if (line == 1) {
            return cos(theta) != 0 ? abs(x - xMax) / cos(theta) : abs(x - xMax);
        } else if (line == 2) {
            return sin(theta) != 0 ? (-1 * abs(y - yMin)) / sin(theta) : abs(y - yMin);
        } else if (line == 3) {
            return cos(theta) != 0 ? (-1 * abs(x - xMin)) / cos(theta) : abs(x - xMin);
        } else if (line == 4) {
            return sin(theta) != 0 ? abs(y - yMax) / sin(theta) : abs(y - yMax);
        }
        return NaN;
    };
}
module.exports = { DistanceSensor };

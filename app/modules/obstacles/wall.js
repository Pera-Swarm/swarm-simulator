//const { AbstractObstacle } = require('../../staging/obstacle.js');
const { abs, round, cos, sin, tan, atan2, sqrt, pow, distance } = require('mathjs');

class WallObstacle {
    constructor(id, width, height, orientation, originX, originY, color, debug = false) {
        // Geometric details
        this.width = width;
        this.height = height;
        this.depth = 5;
        this.orientation = orientation;
        this.color = color;
        this.theta = orientation * (Math.PI / 180);

        this.debug = debug;

        // Corner Points of the wall
        this.p1 = { x: originX, y: originY };
        this.p2 = {
            x: this.p1.x + this.width * cos(this.theta),
            y: this.p1.y + this.width * sin(this.theta)
        };

        if (debug) {
            console.log('Wall obstacle created');
            console.log('ori:', this.orientation, 'width:', width);
            console.log('p1:', this.p1);
            console.log('p2:', this.p2);
            console.log('');
        }
    }

    geometric = () => {
        // Return basic geometric properties of the obstacle
        return {
            p1: this.p1,
            p2: this.p2,
            width: this.width,
            orientation: this.orientation
        };
    };

    appearance = () => {
        // Return basic appearance properties of the obstacle
        return {
            color: this.color
        };
    };

    isInRange = (heading, x, y, angleThreshold = 10) => {
        const from = { x: x, y: y };

        // Lets check the heading in between two points
        const pA1 = this._getAngle(from, this.p1);
        const pA2 = this._getAngle(from, this.p2);

        //console.log(`Calculated Angles: ${pA1}, ${pA2}`);

        const a1 = this._angleDifference(heading, pA1);
        const a2 = this._angleDifference(heading, pA2);

        //console.log(`heading: ${heading}, a1:${a1}, a2:${a2}`);

        return a1 * a2 <= 0; // Angles should be in different signs
    };

    getDistance = (heading, x, y) => {
        const from = { x: x, y: y };

        if (this.isInRange(heading, x, y) == 0) {
            return undefined;
        } else {
            const headingLine = this._getLine(x, y, heading * (Math.PI / 180));
            const obstacleLine = this._getLine(this.p1.x, this.p1.y, this.theta);

            console.log('headingLine:', headingLine);
            console.log('obstacleLine:', obstacleLine);

            const intersectionPoint = this._getIntersectionPoint(
                headingLine,
                obstacleLine
            );
            console.log('intersectionPoint', intersectionPoint);

            const headingDistance = this._point2PointDistance(from, intersectionPoint);

            console.log('headingDistance: ' + headingDistance);
            return headingDistance;
        }
    };

    visualize = () => {
        return [
            {
                id: 1001,
                geometry: {
                    type: 'BoxGeometry',
                    width: this.width,
                    height: this.height,
                    depth: this.depth
                },
                material: {
                    type: 'MeshStandardMaterial',
                    properties: {
                        color: '#505050'
                    }
                },
                position: {
                    x: (this.p1.x + this.p2.x) / 2,
                    y: (this.p1.y + this.p2.y) / 2
                },
                rotation: {
                    x: 0,
                    y: this.orientation,
                    z: 0
                }
            }
        ];
    };

    // Private functions -------------------------------------------------

    _normalizedAngle = (a) => {
        let b = (a + 180) % 360;
        if (b <= 0) b += 360;
        b = b - 180;
        return round(b, 2);
    };

    _getAngle = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return this._normalizedAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
    };

    _angleDifference = (heading, angle) => {
        // Get the absolute difference between heading and target angle
        var difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;
        return difference;
    };

    _getLine = (x, y, angle) => {
        var a, b, c;
        if ((angle == 90 * (Math.PI / 180)) || (angle == -90 * (Math.PI / 180))) {
            a = 0;
            b = -1 * sin(angle);
            c = (sin(angle) * x) - (cos(angle) * y);
        } else if ((angle == 0) || (angle == 1 * Math.PI)) {
            a = cos(angle);
            b = 0;
            c = (sin(angle) * x) - (cos(angle) * y);
        } else {
            a = cos(angle);
            b = -1 * sin(angle);
            c = (sin(angle) * x) - (cos(angle) * y);
        }
        return { a, b, c };
    };

    _getIntersectionPoint = (line1, line2) => {
        const x =
            (line1.b * line2.c - line2.b * line1.c) /
            (line1.a * line2.b - line2.a * line1.b);
        const y =
            (line2.a * line1.c - line1.a * line2.c) /
            (line1.a * line2.b - line2.a * line1.b);
        return { x, y };
    };

    _point2PointDistance = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return round(sqrt(pow(xDiff, 2) + pow(yDiff, 2)), 2);
    };
}

module.exports = { WallObstacle };

//const { AbstractObstacle } = require('../../staging/obstacle.js');
const { sqrt, pow, abs, round, cos, sin, atan2, max, asin } = require('mathjs');

class CylinderObstacle {
    constructor(id, radius, height, originX, originY, debug = false) {
        // Geometric details
        this.radius = radius;
        this.height = height;
        this.debug = debug;

        // Center point of the cylinder
        this.p = { x: originX, y: originY };

        if (debug) {
            console.log('Cylinder obstacle created');
            console.log('radius:', this.radius, 'height:', height);
            console.log('p:', this.p);
            console.log('');
        }
    }

    geometric = () => {
        // Return basic geometric properties of the obstacle
        return {
            p: this.p,
            radius: this.radius,
            height: this.height
        };
    };

    isInRange = (heading, x, y, angleThreshold = 0) => {
        const from = { x: x, y: y };
        const head = this._normalizedAngle(heading);

        // Angle from robot to obstacle
        const angle = this._getAngle(from, this.p);

        // Distance from robot to obstacle center
        const dist = this._point2PointDistance(from, this.p);

        // Angle difference of the tangents of the cylinder from its center
        const deltaT = dist > 0 ? abs(asin(this.radius / dist) * (180 / Math.PI)) : 0;

        // Angles of the two tangents of the cylinder and the heading.
        // ___ 360 added to avoid corner cases
        // ___ angleThreshold is the allowed threshold from the cylinder edges
        const aCW = angle - deltaT + 360 - angleThreshold;
        const aCCW = angle + deltaT + 360 + angleThreshold;
        const aHeading = this._normalizedAngle(head) + 360;

        if (this.debug) {
            console.log(`Calculated Angle: ${angle}, deltaT: ${deltaT}`);
            console.log(
                'heading:',
                head,
                'CCW:',
                round(aCCW - 360, 2),
                'CW:',
                round(aCW - 360, 2)
            );
        }

        return aCW <= aHeading && aHeading <= aCCW;
    };

    getDistance = (heading, x, y) => {
        // Return the distance from the ecenter of robot to the wall of the cylinder
        const from = { x: x, y: y };
        const dist = this._point2PointDistance(from, this.p);
        return max(dist - this.radius, 0);
    };

    visualize = () => {
        return [
            {
                id: 1001,
                geometry: {
                    type: 'CylinderGeometry',
                    radiusTop: this.radius,
                    radiusBottom: this.radius,
                    height: this.height
                },
                material: {
                    type: 'MeshStandardMaterial',
                    properties: {
                        color: '#505050'
                    }
                },
                position: {
                    x: this.p.x,
                    y: this.p.y
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        ];
    };

    // Private functions -------------------------------------------------

    _point2PointDistance = (from, to) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return round(sqrt(pow(xDiff, 2) + pow(yDiff, 2)), 2);
    };

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
}

module.exports = { CylinderObstacle };

//const { AbstractObstacle } = require('../../staging/obstacle.js');
const { abs, round, cos, sin, atan2 } = require('mathjs');

class WallObstacle {
    constructor(id, width, height, orientation, originX, originY, debug = false) {
        // Geometric details
        this.width = width;
        this.height = height;
        this.depth = 5;
        this.orientation = orientation;
        this.theta = (orientation / 360) * 2 * Math.PI;

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

    isInRange = (heading, x, y, angleThreshold = 10) => {
        const from = { x: x, y: y };

        // Lets check the heading in between two points
        const pA1 = this._getAngle(from, this.p1);
        const pA2 = this._getAngle(from, this.p2);

        console.log(`Calculated Angles: ${pA1}, ${pA2}`);

        const a1 = this._angleDifference(heading, pA1);
        const a2 = this._angleDifference(heading, pA2);

        console.log(`heading: ${heading}, a1:${a1}, a2:${a2}`);

        // TODO: Need proper logic to take the decision

        return false;
    };

    getDistance = (heading, x, y) => {
        // TODO: Need to implement
        return 0;
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
}

module.exports = { WallObstacle };

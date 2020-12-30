//const { AbstractObstacle } = require('../../staging/obstacle.js');
const { abs, round, cos, sin, atan2 } = require('mathjs');

class WallObstacle {

    constructor(width, orientation, originX, originY, debug=false) {

        this._width = width;
        this._theta = ((orientation / 360) * 2 * Math.PI);
        this.debug = debug;

        // Corner Points
        this.p1 = {x: originX, y: originY};
        this.p2 = {x: this.p1.x + this._width*cos(this._theta), y:this.p1.y + this._width*sin(this._theta)};

        if(debug) {
            console.log('Wall obstacle created');
            console.log('ori:', this._theta, 'width:', width);
            console.log('p1:', this.p1);
            console.log('p2:', this.p2);
            console.log('');
        }

    }

    geometric = () => {
        return {

        };
    };

    visualize  = () => {
        return {

        };
    };

    isInRange = (heading, x, y, angleThreshold=10) => {

        const from = {x: x, y:y };

        // Lets check the heading in between two points
        const pA1 = this._getAngle(from, this.p1);
        const pA2 = this._getAngle(from, this.p2);

        console.log(`Calculated Angles: ${pA1}, ${pA2}`);

        const a1 = this._angleDifference(heading, pA1);
        const a2 = this._angleDifference(heading, pA2);

        console.log(`heading: ${heading}, a1:${a1}, a2:${a2}`);

        return false;
    };

    getDistance = (x, y, heading)=> {

        return 0;
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
        // Get the absolute difference between robot heading and target robot's absolute angle
        var difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;

        //if (this.debug)
        //    console.log(`heading: ${heading}, angle:${angle}, diff:${difference}`);

        return difference;
    };
}
module.exports = { WallObstacle };

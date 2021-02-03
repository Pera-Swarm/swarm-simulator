const { sqrt, pow, abs, round, atan2, max, asin } = require('mathjs');

// import { normalizeAngle } from 'pera-swarm/lib';
import {
    AbstractCylinder,
    ObjectCoordinate,
    validateObjectCoordinate,
    VisualizeType,
    CylinderPropType
} from '../abstractObstacles';

export class Cylinder extends AbstractCylinder {
    constructor(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        color: string = '#404040',
        reality: 'R' | 'V',
        debug = false
    ) {
        super(radius, height, { x: originX, y: originY }, reality, debug);

        this._color = color;

        if (debug) {
            console.log(`Created: [\n ${this.toString()}] `);
        }
    }
    public toString = (): string => {
        return (
            `  ${this._type} Obstacle\n   radius : ${this._radius} height: ${this._height}\n` +
            `   center: x: ${this.position.x} y:${this.position.y}\n` +
            `   color: ${this._color} reality: ${this._reality}`
        );
    };

    geometric = () => {
        return {
            center: this.position,
            height: this._height,
            radius: this._radius
        };
    };

    /**
     * @param {number} heading heading value
     * @param {number} x x value
     * @param {number} y y value
     * @returns {number} the distance from the center of robot to the wall of the cylinder
     */
    getDistance = (heading: number, x: number, y: number) => {
        // Return
        const from = { x: x, y: y };
        const dist = this._point2PointDistance(from, this.position);
        return max(dist - this._radius, 0);
    };

    getColor = () => {
        return this._color;
    };

    isInRange = (heading: number, x: number, y: number, angleThreshold: number = 0) => {
        const from = { x: x, y: y };
        const head = this._normalizeAngle(heading);

        // Angle from robot to obstacle
        const angle = this._getAngle(from, this.position);

        // Distance from robot to obstacle center
        const dist = this._point2PointDistance(from, this.position);

        // Angle difference of the tangents of the cylinder from its center
        const deltaT = dist > 0 ? abs(asin(this._radius / dist) * (180 / Math.PI)) : 0;

        console.log(`from (${x}, ${y}) head: ${head} (${heading})`);
        console.log(
            `to (${this.position.x}, ${this.position.y}), relativeAngle: ${angle}`
        );

        // Angles of the two tangents of the cylinder and the heading.
        // ___ 360 added to avoid corner cases
        // ___ angleThreshold is the allowed threshold from the cylinder edges
        const aCW = angle - deltaT + 360 - angleThreshold;
        const aCCW = angle + deltaT + 360 + angleThreshold;
        const aHeading = this._normalizeAngle(head) + 360;

        if (this._debug || true) {
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

    visualize = (): VisualizeType[] => {
        return [
            {
                id: this.id,
                geometry: {
                    type: this.geometryType,
                    radiusTop: this._radius,
                    radiusBottom: this._radius,
                    height: this._height
                },
                material: {
                    type: this.materialType,
                    properties: this.appearance
                },
                position: {
                    x: this.position.x,
                    y: this.position.y
                },
                rotation: {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }
        ];
    };

    // -------------------- Private functions --------------------

    _normalizeAngle = (a: number) => {
        // TODO: error in output for input 66
        let b = (a + 180) % 360;
        if (b <= 0) b += 360;
        b = b - 180;
        return round(b, 2);
    };
    _point2PointDistance = (from: ObjectCoordinate, to: ObjectCoordinate) => {
        if (validateObjectCoordinate(from) && validateObjectCoordinate(to)) {
            const xDiff = to.x - from.x;
            const yDiff = to.y - from.y;
            return round(sqrt(pow(xDiff, 2) + pow(yDiff, 2)), 2);
        } else {
            throw new TypeError('Invalid arguments');
        }
    };

    _getAngle = (from: ObjectCoordinate, to: ObjectCoordinate) => {
        if (validateObjectCoordinate(from) && validateObjectCoordinate(to)) {
            const xDiff = to.x - from.x;
            const yDiff = to.y - from.y;
            return this._normalizeAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
        } else {
            throw new TypeError('Invalid arguments');
        }
    };

    _angleDifference = (heading: number, angle: number) => {
        // Get the absolute difference between heading and target angle
        let difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;
        return difference;
    };
}

export { AbstractCylinder, CylinderPropType };

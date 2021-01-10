import { normalizeAngle } from '../../helpers';
import { AbstractObject, ObjectCoordinate, validateObjectCoordinate } from './obstacle';
const { sqrt, pow, abs, round, cos, sin, atan2, max, asin } = require('mathjs');

export abstract class AbstractCylinder extends AbstractObject {
    protected _radius: number;

    constructor(
        radius: number,
        height: number,
        center: ObjectCoordinate,
        debug: boolean
    ) {
        super(height, center, debug);
        this._radius = radius;
        this._type = 'Cylinder';
        this._geometryType = 'CylinderGeometry';
    }

    /**
     * Cylinder Object string representation
     */
    public toString = (): string => {
        return `  ${this._type} Obstacle\n   radius: ${this._radius} height: ${this._height}\n   center: { x: ${this._center.x}, y: ${this._center.y}}\n`;
    };
}

export class Cylinder extends AbstractCylinder {
    constructor(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        debug = false
    ) {
        super(radius, height, { x: originX, y: originY }, debug);
        if (debug) {
            console.log(`Created: [\n ${this.toString()}] `);
        }
    }

    geometric = () => {
        return {
            center: this.center,
            height: this.height,
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
        const dist = this._point2PointDistance(from, this.center);
        return max(dist - this._radius, 0);
    };

    isInRange = (heading: number, x: number, y: number, angleThreshold: number = 0) => {
        const from = { x: x, y: y };
        const head = normalizeAngle(heading);

        // Angle from robot to obstacle
        const angle = this._getAngle(from, this.center);

        // Distance from robot to obstacle center
        const dist = this._point2PointDistance(from, this.center);

        // Angle difference of the tangents of the cylinder from its center
        const deltaT = dist > 0 ? abs(asin(this._radius / dist) * (180 / Math.PI)) : 0;

        // Angles of the two tangents of the cylinder and the heading.
        // ___ 360 added to avoid corner cases
        // ___ angleThreshold is the allowed threshold from the cylinder edges
        const aCW = angle - deltaT + 360 - angleThreshold;
        const aCCW = angle + deltaT + 360 + angleThreshold;
        const aHeading = normalizeAngle(head) + 360;

        if (this._debug) {
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

    visualize = () => {
        return {
            id: this.id,
            geometry: {
                type: this.geometryType,
                radiusTop: this._radius,
                radiusBottom: this._radius,
                height: this.height
            },
            material: {
                type: this.materialType,
                properties: this.appearance
            },
            position: {
                x: this.center.x,
                y: this.center.y
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            }
        };
    };

    // -------------------- Private functions --------------------
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
            return normalizeAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
        } else {
            throw new TypeError('Invalid arguments');
        }
    };

    _angleDifference = (heading: number, angle: number) => {
        // Get the absolute difference between heading and target angle
        var difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;
        return difference;
    };
}

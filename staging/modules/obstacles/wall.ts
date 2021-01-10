import { normalizeAngle } from '../../helpers';
import { AbstractObject, ObjectCoordinate, validateObjectCoordinate } from './obstacle';
const { abs, round, cos, sin, atan2 } = require('mathjs');

export abstract class AbstractWall extends AbstractObject {
    protected _width: number;
    protected _depth: number;
    protected _orientation: number;
    protected _theta: number;
    protected _center2: ObjectCoordinate;

    constructor(
        width: number,
        height: number,
        orientation: number,
        center: ObjectCoordinate,
        depth: number = 5,
        debug: boolean
    ) {
        super(height, center, debug);
        this._width = width;
        this._orientation = orientation;
        this._theta = (orientation / 360) * 2 * Math.PI;
        this._center2 = {
            x: this._center.x + this._width * cos(this._theta),
            y: this._center.y + this._width * sin(this._theta)
        };
        this._depth = depth;
        this._type = 'Wall';
        this._geometryType = 'BoxGeometry';
    }

    /**
     * Wall Object string representation
     */
    public toString = (): string => {
        return `  ${this._type} Obstacle\n   width : ${this._width} height: ${this._height}\n   depth: ${this._depth} orientation: ${this._orientation}\n   center 1: { x: ${this._center.x}, y: ${this._center.y}} center 2: { x: ${this._center2.x}, y: ${this._center2.y}}\n`;
    };
}

export class Wall extends AbstractWall {
    constructor(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number = 5,
        debug = false
    ) {
        super(
            width,
            height,
            orientation,
            {
                x: originX,
                y: originY
            },
            depth,
            debug
        );

        if (debug) {
            console.log(`Created: [\n ${this.toString()}] `);
        }
    }

    geometric = () => {
        return {
            center1: this._center,
            center2: this._center2,
            width: this._width,
            height: this._height,
            depth: this._depth,
            orientation: this._orientation
        };
    };

    getDistance = (x: number, y: number, heading?: any) => {
        // TODO: Need to implement
        return 0;
    };

    isInRange = (heading: number, x: number, y: number, angleThreshold?: number) => {
        const from = { x: x, y: y };

        // Lets check the heading in between two center points
        const pA1 = this._getAngle(from, this._center);
        const pA2 = this._getAngle(from, this._center2);

        console.log(`Calculated Angles: ${pA1}, ${pA2}`);

        const a1 = this._angleDifference(heading, pA1);
        const a2 = this._angleDifference(heading, pA2);

        console.log(`heading: ${heading}, a1:${a1}, a2:${a2}`);

        // TODO: Need proper logic to take the decision

        return false;
    };

    visualize = () => {
        return {
            id: this.id,
            geometry: {
                type: this.geometryType,
                ...this.geometric()
            },
            material: {
                type: this.materialType,
                properties: this.appearance
            },
            position: {
                x: (this._center.x + this._center2.x) / 2,
                y: (this._center.y + this._center2.y) / 2
            },
            rotation: {
                x: 0,
                y: this._orientation,
                z: 0
            }
        };
    };

    // -------------------- Private functions --------------------
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

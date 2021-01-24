import { normalizeAngle } from 'pera-swarm/lib';
import {
    AbstractObject,
    ObjectCoordinate,
    validateObjectCoordinate,
    VisualizeType
} from './obstacle';
const { abs, round, cos, sin, tan, atan2, sqrt, pow, distance } = require('mathjs');

export type WallPropType = {
    width: number;
    height: number;
    depth: number;
    x: number;
    y: number;
    z: number;
};

export abstract class AbstractWall extends AbstractObject {
    protected _width: number;
    protected _depth: number;
    protected _orientation: number;
    protected _theta: number;
    protected _p2: ObjectCoordinate;

    constructor(
        width: number,
        height: number,
        orientation: number,
        position: ObjectCoordinate,
        depth: number = 5,
        debug: boolean
    ) {
        super(height, position, debug);
        this._width = width;
        this._orientation = orientation;
        this._theta = (orientation / 360) * 2 * Math.PI;
        this._p2 = {
            x: this.position.x + this._width * cos(this._theta),
            y: this.position.y + this._width * sin(this._theta)
        };
        this._depth = depth;
        this._type = 'Wall';
        this._geometryType = 'BoxGeometry';
    }

    /**
     * Wall Object string representation
     */
    public toString = (): string => {
        return `  ${this._type} Obstacle\n   width : ${this._width} height: ${this._height}\n   depth: ${this._depth} orientation: ${this._orientation}\n p1: { x: ${this.position.x}, y: ${this.position.y}} p2: { x: ${this._p2.x}, y: ${this._p2.y}}\n`;
    };
}

// This should be in wall.js after pera-swarm library migration
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
            position: this.position,
            center2: this._p2,
            width: this._width,
            height: this._height,
            depth: this._depth,
            orientation: this._orientation
        };
    };

    getDistance = (heading: number, x: number, y: number) => {
        const from = { x: x, y: y };

        if (this.isInRange(heading, x, y) == false) {
            return undefined;
        } else {
            const headingLine = this._getLine(x, y, heading * (Math.PI / 180));
            const obstacleLine = this._getLine(
                this.position.x,
                this.position.y,
                this._theta
            );

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

    isInRange = (heading: number, x: number, y: number, angleThreshold?: number) => {
        const from = { x: x, y: y };

        // Lets check the heading in between two center points
        const pA1 = this._getAngle(from, this.position);
        const pA2 = this._getAngle(from, this._p2);

        //console.log(`Calculated Angles: ${pA1}, ${pA2}`);

        const a1 = this._angleDifference(heading, pA1);
        const a2 = this._angleDifference(heading, pA2);

        //console.log(`heading: ${heading}, a1:${a1}, a2:${a2}`);

        return abs(a1) <= 90 && abs(a2) <= 90 && a1 * a2 <= 0; // Angles should be in different signs
    };

    visualize = (): VisualizeType[] => {
        return [
            {
                id: this.id,
                geometry: {
                    type: this.geometryType,
                    ...this.geometric()
                },
                material: {
                    type: this.materialType,
                    properties: this.appearance
                },
                position: this.position,
                rotation: {
                    x: 0,
                    y: this._orientation,
                    z: 0
                }
            }
        ];
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

    // angle: in degrees
    _angleDifference = (heading: number, angle: number) => {
        // Get the absolute difference between heading and target angle
        let difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;

        return difference;
    };

    // angle: radians
    _getLine = (x: number, y: number, angle: number) => {
        let a, b, c;

        if (angle == 90 * (Math.PI / 180) || angle == -90 * (Math.PI / 180)) {
            // line which parallel to y axis
            a = 0;
            b = -1 * sin(angle);
            c = sin(angle) * x - cos(angle) * y;
        } else if (angle == 0 || angle == 1 * Math.PI) {
            // line which parallel to x axis
            a = cos(angle);
            b = 0;
            c = sin(angle) * x - cos(angle) * y;
        } else {
            a = cos(angle);
            b = -1 * sin(angle);
            c = sin(angle) * x - cos(angle) * y;
        }
        return { a, b, c };
    };

    _getIntersectionPoint = (line1: any, line2: any) => {
        const x =
            (line1.b * line2.c - line2.b * line1.c) /
            (line1.a * line2.b - line2.a * line1.b);
        const y =
            (line2.a * line1.c - line1.a * line2.c) /
            (line1.a * line2.b - line2.a * line1.b);
        return { x, y };
    };

    _point2PointDistance = (from: any, to: any) => {
        const xDiff = to.x - from.x;
        const yDiff = to.y - from.y;
        return round(sqrt(pow(xDiff, 2) + pow(yDiff, 2)), 2);
    };
}

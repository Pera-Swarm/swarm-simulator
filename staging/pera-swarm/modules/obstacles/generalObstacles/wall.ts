const { abs, round, cos, sin, atan2, sqrt, pow } = require('mathjs');

import { normalizeAngle } from 'pera-swarm/lib';
import {
    AbstractBox,
    ObjectCoordinate,
    validateObjectCoordinate,
    VisualizeType
} from '../abstractObstacles';

export type WallPropType = {
    width: number;
    height: number;
    depth: number;
    x: number;
    y: number;
    orientation: number;
};

// This should be in wall.js after pera-swarm library migration
export class Wall extends AbstractBox {
    protected _p1: ObjectCoordinate;
    protected _p2: ObjectCoordinate;

    constructor(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number = 2,
        color: string = '#404040',
        reality: 'R' | 'V',
        debug = false
    ) {
        super(
            width,
            height,
            depth,
            orientation,
            {
                x: originX + (width / 2) * cos((orientation / 180) * Math.PI),
                y: originY + (width / 2) * sin((orientation / 180) * Math.PI)
            },
            reality,
            debug
        );

        // Note: 6 added to the end coordinates to avoid missing the wall by distance sensor
        // Starting coordinate of the wall
        this._p1 = {
            x: originX - 6 * cos(this._theta),
            y: originY - 6 * sin(this._theta)
        };

        // Ending coordinate of the wall
        this._p2 = {
            x: originX + (width + 6) * cos(this._theta),
            y: originY + (width + 6) * sin(this._theta)
        };

        this._color = color;
        this._type = 'Wall';
        this._geometryType = 'BoxGeometry';

        if (debug) {
            console.log(`Created: [\n ${this.toString()}] `);
        }
    }

    public toString = (): string => {
        return (
            `  ${this._type} Obstacle\n   width : ${this._width} height: ${this._height}\n   depth: ${this._depth}  orientation: ${this._orientation}\n` +
            `   p1: { x: ${this._p1.x}, y: ${this._p1.y}}\n` +
            `   p2: { x: ${this._p2.x}, y: ${this._p2.y}}\n` +
            `   center: x: ${this.position.x} y:${this.position.y}\n` +
            `   reality: ${this._reality}`
        );
    };

    geometric = () => {
        return {
            position: this._position,
            p1: this._p1,
            p2: this._p2,
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
                this._position.x,
                this._position.y,
                this._theta
            );

            const intersectionPoint = this._getIntersectionPoint(
                headingLine,
                obstacleLine
            );

            if (this._debug) {
                // console.log('headingLine:', headingLine);
                // console.log('obstacleLine:', obstacleLine);
                // console.log('intersectionPoint', intersectionPoint);
            }

            const headingDistance = this._point2PointDistance(from, intersectionPoint);

            // console.log('headingDistance: ' + headingDistance);
            return headingDistance;
        }
    };

    getColor = () => {
        return this._color;
    };

    isInRange = (heading: number, x: number, y: number, angleThreshold?: number) => {
        const from = { x: x, y: y };

        // The angle between two center points
        const pA1 = this._getAngle(from, this._p1);
        const pA2 = this._getAngle(from, this._p2);
        //console.log(`Calculated Angles: ${pA1}, ${pA2}`);

        // The angle difference between heading and the calculated angle
        const a1 = this._angleDifference(heading, pA1);
        const a2 = this._angleDifference(heading, pA2);
        // console.log(`heading: ${heading}, a1:${a1}, a2:${a2}`);

        // TODO: need to consider angleThreshold
        // Angles should be in different signs
        return (abs(a1) <= 90 || abs(a2) <= 90) && a1 * a2 <= 0;
    };

    visualize = (): VisualizeType[] => {
        return [
            {
                id: this.id,
                reality: this._reality,
                geometry: {
                    type: this.geometryType,
                    width: this._width,
                    height: this._height,
                    depth: this._depth
                },
                material: {
                    type: this.materialType,
                    properties: this.appearance
                },
                position: {
                    x: this._position.x,
                    y: this._position.y
                },
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
            a = 1 * sin(angle);
            b = 0;
            c = -x * sin(angle);
        } else if (angle == 0 || angle == Math.PI) {
            // line which parallel to x axis
            a = 0;
            b = -1 * cos(angle);
            c = y * cos(angle);
        } else {
            a = 1 * sin(angle);
            b = -1 * cos(angle);
            c = -x * sin(angle) + y * cos(angle);
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

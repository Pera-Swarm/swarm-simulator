const { abs, round, cos, sin, tan, atan2, sqrt, pow, distance } = require('mathjs');

import { normalizeAngle } from 'pera-swarm/lib';
import {
    AbstractBox,
    ObjectCoordinate,
    validateObjectCoordinate,
    VisualizeType,
    BoxPropType
} from '../abstractObstacles/abstractBox';

export class Box extends AbstractBox {
    constructor(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
        debug = false
    ) {
        super(
            width,
            height,
            depth,
            orientation,
            {
                x: originX,
                y: originY
            },
            debug
        );

        if (debug) {
            console.log(`Created: [\n ${this.toString()}] `);
        }
    }

    geometric = () => {
        return {
            center: this.position,
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
            return 0;
        }
    };

    getColor = () => {
        return this._color;
    };

    isInRange = (heading: number, x: number, y: number, angleThreshold?: number) => {
        return false;
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
}

// TODO
export { AbstractBox, BoxPropType };

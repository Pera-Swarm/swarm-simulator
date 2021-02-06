import { AbstractBox, VisualizeType, BoxPropType } from '../abstractObstacles';

export class Box extends AbstractBox {
    constructor(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
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
                x: originX,
                y: originY
            },
            reality,
            debug
        );
        this._color = color; /* For the appearance */

        if (debug) {
            console.log(`Created: [\n ${this.toString()}] `);
        }
    }

    public toString = (): string => {
        return (
            `  ${this._type} Obstacle\n   width : ${this._width} height: ${this._height}\n   depth: ${this._depth}  orientation: ${this._orientation}\n` +
            `   center: x: ${this.position.x} y:${this.position.y}\n` +
            `   color: ${this._color} reality: ${this._reality}`
        );
    };

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
        // TODO: need to implement
        return false;
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
                position: this.position,
                rotation: {
                    x: 0,
                    y: this._orientation,
                    z: 0
                }
            }
        ];
    };
}

export { AbstractBox, BoxPropType };

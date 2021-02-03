import {
    AbstractObstacle,
    ObjectCoordinate,
    validateObjectCoordinate,
    VisualizeType
} from './abstractObstacle';

export type BoxPropType = {
    width: number;
    height: number;
    depth: number;
    x: number;
    y: number;
    z: number;
};

export abstract class AbstractBox extends AbstractObstacle {
    protected _width: number;
    protected _depth: number;
    protected _height: number;

    protected _orientation: number;
    protected _theta: number;
    protected _center: ObjectCoordinate;

    protected constructor(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        position: ObjectCoordinate,
        reality: 'R' | 'V',
        debug: boolean
    ) {
        super(position, reality, debug);
        this._width = width;
        this._depth = depth;
        this._height = height;

        this._orientation = orientation; /* Orientation in degrees */
        this._theta = (orientation / 360) * 2 * Math.PI; /* Orientation in radians */

        this._type = 'Box';
        this._geometryType = 'BoxGeometry';
        this._center = position;

        this._reality = reality;
    }

    /**
     * Box Object string representation
     */
    public toString = (): string => {
        return `  ${this._type} Obstacle\n   width : ${this._width} height: ${this._height}\n  depth: ${this._depth} orientation: ${this._orientation}\n position: { x: ${this.position.x}, y: ${this.position.y}}\n`;
    };
}

export { ObjectCoordinate, validateObjectCoordinate, VisualizeType };

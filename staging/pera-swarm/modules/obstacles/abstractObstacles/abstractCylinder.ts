import { Reality } from '../../../types';
import {
    AbstractObstacle,
    ObjectCoordinate,
    validateObjectCoordinate,
    VisualizeType
} from './abstractObstacle';

export type CylinderPropType = {
    radius: number;
    radiusTop?: number;
    radiusBottom?: number;
    height: number;
    x: number;
    y: number;
};

export abstract class AbstractCylinder extends AbstractObstacle {
    protected _radius: number;
    protected _height: number;

    protected constructor(
        radius: number,
        height: number,
        position: ObjectCoordinate,
        reality: Reality,
        debug: boolean
    ) {
        super(position, reality, debug);

        this._radius = radius;
        this._height = height;

        this._type = 'Cylinder';
        this._geometryType = 'CylinderGeometry';

        this._reality = reality;
    }

    /**
     * Cylinder Object string representation
     */
    public toString = (): string => {
        return `  ${this._type} Obstacle\n   radius: ${this._radius} height: ${this._height}\n   position: { x: ${this._position.x}, y: ${this._position.y}}\n`;
    };
}

export { ObjectCoordinate, validateObjectCoordinate, VisualizeType };

import { AbstractObject } from './obstacle';
import { ObstacleBuilder, obstacleBuilder } from './obstaclebuilder';

export interface AbstractObstacleController {
    _list: AbstractObject[];
    createObstacle: Function;
    setMaterialById: Function;
    setColorById: Function;
    getObstacleById: Function;
    getObstacleByType: Function;
    removeObstacleById: Function;
    visualizeObstacles: Function;
}

export class ObstacleController implements AbstractObstacleController {
    builder: ObstacleBuilder;

    protected _list: AbstractObject[];
    protected _size: number;

    constructor() {
        this.builder = obstacleBuilder();
        this._list = [];
        this._size = 0;
    }

    createObstacle = (type: string): Function => {
        switch (type) {
            case obstacleList.WALL:
                return this.builder.createWall;
            case obstacleList.CYLINDER:
                return this.builder.createCylinder;
            default:
                throw new TypeError('Unsupported obstacle type');
        }
    };

    /**
     * get obstacle list
     */
    get list(): AbstractObject[] {
        return this._list;
    }

    /**
     * get size
     */
    get size(): number {
        return this._size;
    }
}

export const obstacleList = {
    WALL: 'WALL',
    CYLINDER: 'CYLINDER'
};

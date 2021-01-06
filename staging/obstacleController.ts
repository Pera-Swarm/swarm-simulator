import { AbstractCylinder } from './cylinder';
import { AbstractObject } from './obstacle';
import { obstacleBuilder, AbstractObstacleBuilder } from './obstaclebuilder';
import { AbstractWall } from './wall';

export interface AbstractObstacleController {
    _list: AbstractObject[];
    setMaterialById: Function;
    setColorById: Function;
    findObstacleById: Function;
    findObstaclesByType: Function;
    removeObstacleById: Function;
    visualizeObstacles: Function;
}

export class ObstacleController
    implements AbstractObstacleBuilder, AbstractObstacleController {
    _list: AbstractObject[];
    private builder: AbstractObstacleBuilder;
    protected static instance: ObstacleController;

    constructor() {
        this._list = [];
        this.builder = obstacleBuilder();
    }

    public static getInstance(): ObstacleController {
        if (!ObstacleController.instance) {
            ObstacleController.instance = new ObstacleController();
        }
        return ObstacleController.instance;
    }

    createWall(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number,
        debug: boolean
    ): AbstractWall {
        const obj = this.builder.createWall(
            width,
            height,
            orientation,
            originX,
            originY,
            depth,
            debug
        );
        this._list.push(obj);
        return obj;
    }

    createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        debug: boolean
    ): AbstractCylinder {
        const obj = this.builder.createCylinder(radius, height, originX, originY, debug);
        this._list.push(obj);
        return obj;
    }

    /**
     * get obstacle list
     */
    get list(): AbstractObject[] {
        return this.list;
    }

    /**
     * method for finding an obstacle in the list with a given id
     * @param {string} type
     * @returns {AbstractObject|-1}
     */
    findObstacleById = (id: string): AbstractObject | -1 => {
        if (id === undefined) {
            throw new TypeError('Invalid id');
        } else {
            const foundObjs = this._list.map((item) => {
                if (item.id === id) {
                    return item;
                }
            });
            if (foundObjs.length !== 0) {
                const obj = foundObjs[0] === undefined ? -1 : foundObjs[0];
                return obj;
            } else {
                return -1;
            }
        }
    };

    /**
     * method for finding obstacles in the list with a given type
     * @param {string} type
     * @returns {AbstractObject[]}
     */
    findObstaclesByType = (type: string): AbstractObject[] => {
        if (type === undefined) {
            throw new TypeError('Invalid type');
        } else {
            const foundObjs: AbstractObject[] = [];
            this._list.forEach((item) => {
                if (item.type === type) {
                    foundObjs.push(item);
                }
            });
            if (foundObjs.length !== 0 && foundObjs[0] !== undefined) {
                return foundObjs;
            } else {
                return [];
            }
        }
    };

    /**
     * method for removing an obstacle in the list by a given id
     * @param {string} id
     */
    removeObstacleById = (id: string) => {
        if (typeof id !== 'string' || id !== undefined) {
            throw new TypeError('Invalid id');
        } else {
            const prevList = this._list;
            prevList.forEach((item, index) => {
                if (item.id === id) {
                    this._list.splice(index, 1);
                }
            });
        }
    };

    /**
     * change material
     * @param {AbstractObject} id
     * @param {string} materialType
     */
    changeMaterial(obstacle: AbstractObject, materialType: string): void {
        if (materialType === undefined) {
            throw new TypeError('Invalid material type');
        } else {
            for (let i = 0; i < this._list.length; i++) {
                if (this._list[i].id === obstacle.id) {
                    this._list[i].setMaterial(materialType);
                }
            }
        }
    }

    /**
     * set material by id
     * @param {string} id
     * @param {string} materialType
     */
    setMaterialById = (id: string, materialType: string) => {
        if (id === undefined && materialType === undefined) {
            throw new TypeError('Invalid params');
        } else {
            for (let i = 0; i < this._list.length; i++) {
                if (this._list[i].id === id) {
                    this._list[i].setMaterial(materialType);
                }
            }
        }
    };

    /**
     * set color by id
     * @param {string} id
     * @param {string} color
     */
    setColorById = (id: string, color: string) => {
        if (id === undefined && color === undefined) {
            throw new TypeError('Invalid params');
        } else {
            for (let i = 0; i < this._list.length; i++) {
                if (this._list[i].id === id) {
                    this._list[i].setColor(color);
                }
            }
        }
    };

    /**
     * method for obtaining a list of visualize object representation of obstacles
     */
    visualizeObstacles = () => {
        const visualizeList = this._list.map((item) => {
            return item.visualize();
        });
        return visualizeList;
    };
}

/**
 * get singleton obstacle controller instance
 */
export const obstacleController = () => {
    return ObstacleController.getInstance();
};

export const obstacleList = {
    WALL: 'WALL',
    CYLINDER: 'CYLINDER'
};

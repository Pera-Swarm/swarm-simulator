import { AbstractCylinder } from './cylinder';
import { AbstractObject, VisualizeType } from './obstacle';
import { obstacleBuilder, AbstractObstacleBuilder } from './obstacleBuilder';
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
     * @param {JSON} data json config data for the arena
     */
    createObstaclesJSON = (data: JSON) => {
        if (Array.isArray(data)) {
            data.forEach((element) => {
                const { geometry } = element;
                switch (geometry.type) {
                    case 'BoxGeometry':
                        this.createWallJSON(element);
                        break;
                    case 'CylinderGeometry':
                        this.createCylinderJSON(element);
                        break;
                    default:
                        break;
                }
            });
        }
    };

    createWallJSON = (data: JSON) => {
        console.log(data);
    };

    createCylinderJSON = (data: JSON) => {
        console.log(data);
    };

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
            console.error('Invalid id');
            return -1;
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
            console.error('Invalid type');
            return [];
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
     * method for finding is there any obstacle in front
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {boolean} true : if there any obstacle in heading direction
     */
    isObstacleThere = (heading: number, x: number, y: number) => {
        // TODO: @luk3Sky please review this
        var found = false;

        for (var i = 0; i < this._list.length; i++) {
            found = this._list[i].isInRange(heading, x, y);
            //console.log(found);
            if (found == true) return true;
        }
        return found;
    };

    /**
     * method for obtain the virtaul distance sensor readings with these virtual objects
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {number | Infinity} if thre any obstacle in heading front, return the distance to the closest one
     */
    getDistance = (heading: number, x: number, y: number) => {
        // TODO: @luk3Sky please review this
        var minDist = Infinity;

        for (var i = 0; i < this._list.length; i++) {
            const found = this._list[i].isInRange(heading, x, y);
            //console.log(found);
            if (found == true) {
                const dist = this._list[i].getDistance(heading, x, y);
                console.log(dist);

                if (dist > 0 && dist <= minDist) {
                    minDist = dist;
                }
            }
        }
        return minDist;
    };

    /**
     * method for removing an obstacle in the list by a given id
     * @param {string} id
     */
    removeObstacleById = (id: string) => {
        if (typeof id !== 'string' || id !== undefined) {
            console.error('Invalid id');
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
            console.error('Invalid material type');
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
            console.error('Invalid params');
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
            console.error('Invalid params');
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
     * @returns {any} ObstacleAPI defined Objects
     */
    visualizeObstacles = (): VisualizeType[] => {
        var visualizeList: VisualizeType[] = [];
        this._list.forEach((item: AbstractObject) => {
            // one obstacle object can have multiple geometrics.
            item.visualize().forEach((itemChild: VisualizeType) => {
                visualizeList.push(itemChild);
            });
        });
        // return a list of Obstacle API defined objects
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

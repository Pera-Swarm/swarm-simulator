import { abs, cos, sin } from 'mathjs';
import { normalizeValueRange } from '../../helpers';

import { ArenaType } from '../environment';
import { AbstractObstacle, VisualizeType } from './abstractObstacles';
import { obstacleBuilder, AbstractObstacleBuilder } from './obstacleBuilder';

// Implemented obstacles
import { Box, Cylinder, Wall } from './generalObstacles';

// PropTypes of implemented obstacles
import { BoxPropType, CylinderPropType, WallPropType } from './generalObstacles';

const defaultArenaConfig = {
    xMin: 150,
    xMax: 150,
    yMin: 150,
    yMax: 150,
    units: 'virtual'
};

export interface AbstractObstacleController {
    _list: AbstractObstacle[];
    createObstaclesJSON: Function;
    setMaterialById: Function;
    setColorById: Function;
    findObstacleById: Function;
    findObstaclesByType: Function;
    removeObstacleById: Function;
    visualizeObstacles: Function;
}

export class ObstacleController
    implements AbstractObstacleBuilder, AbstractObstacleController {
    _list: AbstractObstacle[];
    _arenaConfig: ArenaType;
    private builder: AbstractObstacleBuilder;
    protected static instance: ObstacleController;

    constructor(config: ArenaType) {
        this._list = [];
        this._arenaConfig = config;
        this.builder = obstacleBuilder();
    }

    public static getInstance(
        config: ArenaType = defaultArenaConfig
    ): ObstacleController {
        if (!ObstacleController.instance) {
            ObstacleController.instance = new ObstacleController(config);
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
        color: string,
        reality: 'R' | 'V',
        debug: boolean
    ): Wall {
        const obj = this.builder.createWall(
            width,
            height,
            orientation,
            originX,
            originY,
            depth,
            color,
            reality,
            debug
        );
        this._list.push(obj);
        return obj;
    }

    createBox(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
        color: string,
        reality: 'R' | 'V',
        debug: boolean
    ): Box {
        const obj = this.builder.createBox(
            width,
            height,
            depth,
            orientation,
            originX,
            originY,
            color,
            reality,
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
        color: string,
        reality: 'R' | 'V',
        debug: boolean
    ): Cylinder {
        const obj = this.builder.createCylinder(
            radius,
            height,
            originX,
            originY,
            color,
            reality,
            debug
        );
        this._list.push(obj);
        return obj;
    }

    /**
     * @param {JSON} data json config data for the arena
     */
    createObstaclesJSON = (data: JSON, config: ArenaType = defaultArenaConfig) => {
        if (Array.isArray(data)) {
            data.forEach((element) => {
                const { id, type, parameters, reality } = element;
                const debug = false;
                const {
                    x,
                    y,
                    orientation,
                    width,
                    height,
                    depth,
                    radius,
                    color
                } = parameters;

                switch (type) {
                    case 'wall':
                        this.createWall(
                            width,
                            height,
                            orientation,
                            x,
                            y,
                            2,
                            color,
                            reality,
                            debug
                        );
                        break;
                    case 'box':
                        this.createBox(
                            width,
                            height,
                            depth,
                            orientation,
                            x,
                            y,
                            color,
                            reality,
                            debug
                        );
                        break;
                    case 'cylinder':
                        this.createCylinder(radius, height, x, y, color, reality, debug);
                        break;
                    case 'cone':
                        console.error('cone obstacles not implemented.');
                        break;
                    default:
                        console.error('undefined obstacle found in env.config.json');
                        break;
                }
            });
        }
    };

    /**
     * create a wall obstacle from JSON data
     * @param {VisualizeType} data obstacle JSON data
     */
    // createWallJSON = (data: VisualizeType, config: ArenaType) => {
    //     const decodedProps = this._decodeWallPropsFromJSON(data);
    //     if (decodedProps !== -1) {
    //         const { width, height, x, y, orientation, depth } = decodedProps;
    //         this.createWall(
    //             width,
    //             height,
    //             orientation,
    //             normalizeValueRange(x, config.xMin, config.xMax),
    //             normalizeValueRange(y, config.yMin, config.yMax),
    //             depth,
    //             false
    //         );
    //         // this.createWall(width, height, orientation, originX, originY, depth, debug);
    //     }
    // };

    /**
     * create a cylinder obstacle from JSON data
     * @param {VisualizeType} data obstacle JSON data
     */
    // createCylinderJSON = (data: VisualizeType, config: ArenaType) => {
    //     const decodedProps = this._decodeCylinderPropsFromJSON(data);
    //     if (decodedProps !== -1) {
    //         const { radius, radiusTop, radiusBottom, height, x, y } = decodedProps;
    //         // const radius = (radiusTop + radiusBottom) / 2; // Temp
    //         this.createCylinder(
    //             radius,
    //             height,
    //             x, // normalizeValueRange(x, config.xMin, config.xMax),
    //             y, // normalizeValueRange(y, config.yMin, config.yMax),
    //             false
    //         );
    //     }
    // };

    /**
     * get obstacle list
     */
    get list(): AbstractObstacle[] {
        return this.list;
    }

    /**
     * method for finding an obstacle in the list with a given id
     * @param {string} type
     * @returns {AbstractObstacle|-1}
     */
    findObstacleById = (id: string): AbstractObstacle | -1 => {
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
     * @returns {AbstractObstacle[]}
     */
    findObstaclesByType = (type: string): AbstractObstacle[] => {
        if (type === undefined) {
            console.error('Invalid type');
            return [];
        } else {
            const foundObjs: AbstractObstacle[] = [];
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
     * @param {reality} reality 'R'|'V'|'M', reality flag
     * @returns {boolean} true : if there any obstacle in heading direction
     */
    isObstacleThere = (
        heading: number,
        x: number,
        y: number,
        reality: 'R' | 'V' | 'M' = 'M'
    ) => {
        let found = false;

        for (let i = 0; i < this._list.length; i++) {
            found = this._list[i].isInRange(heading, x, y);
            //console.log(found);
            if (found == true && (reality === 'M' || reality == this._list[i].reality))
                return true;
        }
        return found;
    };

    /**
     * method for obtain the virtaul distance sensor readings with these virtual objects
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {reality} reality 'R'|'V'|'M', reality flag
     * @param {number} distanceThreshold distance threshold
     * @returns {string | null} if thre any obstacle in heading front, return the color to the closest one
     */
    getColor = (
        heading: number,
        x: number,
        y: number,
        reality: 'R' | 'V' | 'M' = 'M',
        distanceThreshold: number = 20
    ) => {
        let minDist = Infinity;
        let color = '#000000';

        for (let i = 0; i < this._list.length; i++) {
            const found = this._list[i].isInRange(heading, x, y, reality);
            //console.log(found);
            if (found == true) {
                const dist = this._list[i].getDistance(heading, x, y);
                console.log(`obstacle > dist: ${dist}, color:${color}`);

                if (dist > 0 && dist <= minDist) {
                    minDist = dist;
                    color = this._list[i].appearance.color;
                }
            }
        }
        if (minDist > distanceThreshold) {
            color = '#000000';
        }

        console.log(`dist:${minDist}, color:${color}`);
        return color;
    };

    /**
     * method for obtain the virtaul distance sensor readings with these virtual objects
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {reality} reality 'R'|'V'|'M', reality flag
     * @returns {number | Infinity} if thre any obstacle in heading front, return the distance to the closest one
     */
    getDistance = (
        heading: number,
        x: number,
        y: number,
        reality: 'R' | 'V' | 'M' = 'M'
    ) => {
        let minDist = Infinity;

        for (let i = 0; i < this._list.length; i++) {
            const found = this._list[i].isInRange(heading, x, y, reality);
            // console.log(this._list[i].id, 'isInRange ? ', found);

            if (found == true) {
                const dist = this._list[i].getDistance(heading, x, y);
                // console.log(dist, this._list[i].reality);

                if (dist >= 0 && dist <= minDist) {
                    minDist = dist;
                }
            }
        }

        if (minDist === Infinity) {
            console.error(`Infinity detected from (${x},${y}), heading:${heading} !!!`);
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
     * @param {AbstractObstacle} id
     * @param {string} materialType
     */
    changeMaterial(obstacle: AbstractObstacle, materialType: string): void {
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
    visualizeObstacles = (filter: 'M' | 'V' | 'R' = 'M'): VisualizeType[] => {
        let visualizeList: VisualizeType[] = [];
        //console.log('filter:', filter);

        this._list.forEach((item: AbstractObstacle) => {
            // one obstacle object can have multiple geometrics.
            //console.log(item.reality);

            if (item.reality === filter || filter == 'M') {
                item.visualize().forEach((itemChild: VisualizeType) => {
                    visualizeList.push(itemChild);
                });
            }
        });
        // return a list of Obstacle API defined objects
        return visualizeList;
    };

    /**
     * decode properties required to create a wall from a given JSON data
     * @param { WallPropType | -1} data wall JSON data
     */
    private _decodeWallPropsFromJSON = (data: VisualizeType): WallPropType | -1 => {
        let { geometry, position, rotation } = data;
        let { width, height, depth } = geometry;
        let { x, y } = position;
        let { y: orientation } = rotation;
        let i = 0;
        if (width === undefined) i += 1;
        if (height === undefined) i += 1;
        if (depth === undefined) i += 1;
        if (x === undefined) i += 1;
        if (y === undefined) i += 1;
        if (orientation === undefined) i += 1;
        if (i !== 0) {
            console.error('Failed_To_Derive_Wall_Properties');
            return -1;
        }
        return this._normalizeWallProps(width, height, depth, x, y, orientation);
    };

    /**
     * decode properties required to create a cylinder from a given JSON data
     * @param { CylinderPropType | -1} data cylinder JSON data
     */
    private _decodeCylinderPropsFromJSON = (
        data: VisualizeType
    ): CylinderPropType | -1 => {
        let { geometry, position, rotation } = data;
        let { radius, radiusTop, radiusBottom, height } = geometry;
        let { x, y } = position;
        // let { z } = rotation;
        let i = 0;
        if (radiusTop === undefined && radiusBottom === undefined && radius === undefined)
            i += 1;
        if (height === undefined) i += 1;
        if (x === undefined) i += 1;
        if (y === undefined) i += 1;
        if (i !== 0) {
            console.error('Failed_To_Parse_Wall_Properties');
            return -1;
        }
        return {
            radius,
            radiusTop,
            radiusBottom,
            height,
            x,
            y
        };
    };

    _normalizeWallProps = (
        width: number,
        height: number,
        depth: number,
        x: number,
        y: number,
        orientation: number
    ) => {
        const normalizedOrientation = normalizeValueRange(orientation, -360, 360);
        // validating a wall instance that to be created or not according to env limitations
        // TODO: @NuwanJ Please review this
        const theta = (normalizedOrientation / 360) * 2 * Math.PI;
        let upperEdgeX = x + (width / 2) * cos(theta);
        let upperEdgeY = y + (width / 2) * sin(theta);
        let lowerEdgeX = x - (width / 2) * cos(theta);
        let lowerEdgeY = y - (width / 2) * sin(theta);
        if (
            (abs(x) > abs(this._arenaConfig.xMax) &&
                abs(y) > abs(this._arenaConfig.yMax)) ||
            (abs(x) > abs(this._arenaConfig.xMax) &&
                abs(y) > abs(this._arenaConfig.yMin)) ||
            (abs(x) > abs(this._arenaConfig.xMin) &&
                abs(y) > abs(this._arenaConfig.yMax)) ||
            (abs(x) > abs(this._arenaConfig.xMin) && abs(y) > abs(this._arenaConfig.yMin))
        ) {
            console.log(
                'First scenario',
                x,
                y,
                abs(x) < abs(this._arenaConfig.xMin),
                abs(y) > abs(this._arenaConfig.yMin),
                typeof this._arenaConfig.xMin,
                typeof this._arenaConfig.yMin
            );
            return -1;
            // }else if(){
            //     return {
            //         width,
            // height,
            // depth,
            // x,
            // y,
            // orientation
            //     }
            // }
        } else {
            let normalizedX = normalizeValueRange(
                x,
                this._arenaConfig.xMin,
                this._arenaConfig.xMax
            );
            let normalizedY = normalizeValueRange(
                y,
                this._arenaConfig.yMin,
                this._arenaConfig.yMax
            );
            return {
                width,
                height,
                depth,
                x,
                y,
                orientation
            };
        }
    };
}

/**
 * get singleton obstacle controller instance
 */
export const obstacleController = (config: ArenaType = defaultArenaConfig) => {
    return ObstacleController.getInstance(config);
};

export const obstacleList = {
    WALL: 'WALL',
    CYLINDER: 'CYLINDER'
};

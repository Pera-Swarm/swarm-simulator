import { Cylinder } from './generalObstacles/cylinder';
import { Wall } from './generalObstacles/wall';
import { Box } from './generalObstacles/box';
import { AbstractObstacle } from './abstractObstacles/abstractObstacle';
import { ObstacleMaterialTypes, Reality } from '../../types';

export interface AbstractObstacleBuilder {
    createWall(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number,
        color: string,
        reality: Reality,
        debug: boolean
    ): Wall;

    createBox(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
        color: string,
        reality: Reality,
        debug: boolean
    ): Box;

    createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        color: string,
        reality: Reality,
        debug: boolean
    ): Cylinder;

    changeMaterial(obstacle: AbstractObstacle, materialType: ObstacleMaterialTypes): void;
}

export class ObstacleBuilder implements AbstractObstacleBuilder {
    protected static instance: ObstacleBuilder;

    public static getInstance(): ObstacleBuilder {
        if (!ObstacleBuilder.instance) {
            ObstacleBuilder.instance = new ObstacleBuilder();
        }
        return ObstacleBuilder.instance;
    }

    /**
     *
     * @param {number} width width of the wall
     * @param {number} height height of the wall
     * @param {number} orientation in which direction wall orient, from the origin (x,y)
     * @param {number} originX origin x coordinate
     * @param {number} originY origin y coordinate
     * @param {number} depth thickness of the wall
     * @param {string } color color of the wall
     * @param {Reality} reality reality of the wall, [R,V]
     * @param {boolean} debug boolean to enable debug flag
     * @returns {Wall} object
     */
    public createWall(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number,
        color: string,
        reality: Reality,
        debug: boolean
    ): Wall {
        return new Wall(
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
    }

    /**
     *
     * @param {number} width width of the box (in xy plane)
     * @param {number} height height of the box (in z direction)
     * @param {number} depth depth of the box (in xy plane)
     * @param {number} orientation orientation of the box
     * @param {number} originX origin x coordinate
     * @param {number} originY origin y coordinate
     * @param {string} color color of the wall
     * @param {Reality} reality reality of the wall, [R,V]
     * @param {boolean} debug boolean to enable debug flag
     * @returns {Box} object
     */
    public createBox(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
        color: string,
        reality: Reality,
        debug: boolean
    ): Box {
        return new Box(
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
    }

    /**
     *
     * @param {number} radius radius of the cylinder
     * @param {number} height height of the cylinder
     * @param {number} originX origin x coordinate
     * @param {number} originY origin y coordinate
     * @param {string} color color of the wall
     * @param {Reality} reality reality of the wall, [R,V]
     * @param {boolean} debug boolean to enable debug flag
     * @returns {Cylinder} object
     */
    public createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        color: string,
        reality: Reality,
        debug: boolean
    ): Cylinder {
        return new Cylinder(radius, height, originX, originY, color, reality, debug);
    }

    /**
     *
     * @param {AbstractObstacle} obstacle
     * @param {ObstacleMaterialTypes} materialType
     */
    public changeMaterial = (
        obstacle: AbstractObstacle,
        materialType: ObstacleMaterialTypes
    ) => {
        obstacle.setMaterial(materialType);
    };
}

/**
 * get singleton obstacle builder instance
 */
export const obstacleBuilder = () => {
    return ObstacleBuilder.getInstance();
};

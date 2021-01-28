import { Cylinder, CylinderPropType } from './generalObstacles/cylinder';
import { Wall, WallPropType } from './generalObstacles/wall';
import { Box, BoxPropType } from './generalObstacles/box';
import { AbstractObstacle } from './abstractObstacles/abstractObstacle';

export interface AbstractObstacleBuilder {
    createWall(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number,
        debug: boolean
    ): Wall;

    createBox(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
        debug: boolean
    ): Box;

    createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        debug: boolean
    ): Cylinder;

    changeMaterial(obstacle: AbstractObstacle, materialType: string): void;
}

export class ObstacleBuilder implements AbstractObstacleBuilder {
    protected static instance: ObstacleBuilder;

    public static getInstance(): ObstacleBuilder {
        if (!ObstacleBuilder.instance) {
            ObstacleBuilder.instance = new ObstacleBuilder();
        }
        return ObstacleBuilder.instance;
    }

    createWall(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number,
        debug: boolean
    ): Wall {
        return new Wall(width, height, orientation, originX, originY, depth, debug);
    }

    createBox(
        width: number,
        height: number,
        depth: number,
        orientation: number,
        originX: number,
        originY: number,
        debug: boolean
    ): Box {
        return new Box(width, height, depth, orientation, originX, originY, debug);
    }

    createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        debug: boolean
    ): Cylinder {
        return new Cylinder(radius, height, originX, originY, debug);
    }

    changeMaterial = (obstacle: AbstractObstacle, materialType: string) => {
        obstacle.setMaterial(materialType);
    };
}

/**
 * get singleton obstacle builder instance
 */
export const obstacleBuilder = () => {
    return ObstacleBuilder.getInstance();
};

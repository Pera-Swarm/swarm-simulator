import { AbstractCylinder, Cylinder } from './cylinder';
import { AbstractWall, Wall } from './wall';
import { AbstractObject } from './obstacle';

interface AbstractObstacleBuilder {
    createWall(
        width: number,
        height: number,
        orientation: number,
        originX: number,
        originY: number,
        depth: number,
        debug: boolean
    ): AbstractWall;
    createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        debug: boolean
    ): AbstractCylinder;

    changeMaterial(obstacle: AbstractObject, materialType: string): void;
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
    ): AbstractWall {
        return new Wall(width, height, orientation, originX, originY, depth, debug);
    }

    createCylinder(
        radius: number,
        height: number,
        originX: number,
        originY: number,
        debug: boolean
    ): AbstractCylinder {
        return new Cylinder(radius, height, originX, originY, debug);
    }

    changeMaterial = (obstacle: AbstractObject, materialType: string) => {
        obstacle.setMaterial(materialType);
    };
}

export const obstacleBuilder = () => {
    return ObstacleBuilder.getInstance();
};

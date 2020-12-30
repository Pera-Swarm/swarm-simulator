type ObstacleCoordinate = {
    x: number;
    y: number;
};

/**
 * @class Obstacle
 * @classdesc Obstacle Representation
 */
abstract class AbstractObstacle {
    protected _height: number;
    protected _width: number;
    protected _length: number;
    protected _coordinate: ObstacleCoordinate;

    constructor(height: number, width: number, length: number) {
        this._height = height;
        this._width = width;
        this._length = length;
        // other geometric properties if necessary
    }

    /**
     * return {an array of geometric properties of the object};
     */
    abstract geometric = () => {};

    /**
     * return [
        	{an array of properties need to be set in three.js object creation},
        	{an array of properties need to be set in three.js object creation}
        ]
     */
    abstract visualize = () => {};

    /**
     * return (is object in front of the source robot or not as boolean);
     * @param heading
     * @param x
     * @param y
     * @param angleThreshold
     */
    abstract isInRange = (
        heading: number,
        x: number,
        y: number,
        angleThreshold = 10
    ) => {};

    /**
     * return (distance from the given object to this obstacle);
     * @param x
     * @param y
     * @param heading
     */
    abstract getDistance = (x: number, y: number, heading = null) => {};

    // Any other utility methods required...
}

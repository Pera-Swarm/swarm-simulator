/**
 * @class Obstacle
 * @classdesc Obstacle Representation
 */
var AbstractObstacle = /** @class */ (function () {
    function AbstractObstacle(height, width, length) {
        /**
         * return {an array of geometric properties of the object};
         */
        this.geometric = function () {};
        /**
         * return [
                {an array of properties need to be set in three.js object creation},
                {an array of properties need to be set in three.js object creation}
            ]
         */
        this.visualize = function () {};
        /**
         * return (is object in front of the source robot or not as boolean);
         * @param heading
         * @param x
         * @param y
         * @param angleThreshold
         */
        this.isInRange = function (heading, x, y, angleThreshold) {
            if (angleThreshold === void 0) {
                angleThreshold = 10;
            }
        };
        /**
         * return (distance from the given object to this obstacle);
         * @param x
         * @param y
         * @param heading
         */
        this.getDistance = function (x, y, heading) {
            if (heading === void 0) {
                heading = null;
            }
        };
        this._height = height;
        this._width = width;
        this._length = length;
        // other geometric properties if necessary
    }
    return AbstractObstacle;
})();

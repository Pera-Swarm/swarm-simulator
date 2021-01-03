"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var lib_1 = require("pera-swarm/lib");
var obstacle_1 = require("./obstacle");
var _a = require('mathjs'), abs = _a.abs, round = _a.round, cos = _a.cos, sin = _a.sin, atan2 = _a.atan2;
var AbstractWall = /** @class */ (function (_super) {
    __extends(AbstractWall, _super);
    function AbstractWall(width, height, orientation, center, depth, debug) {
        if (depth === void 0) { depth = 5; }
        var _this = _super.call(this, height, center, debug) || this;
        /**
         * Wall Object string representation
         */
        _this.toString = function () {
            return "  " + _this._type + " Obstacle\n   width : " + _this._width + " height: " + _this._height + "\n   depth: " + _this._depth + " orientation: " + _this._orientation + "\n   center 1: { x: " + _this._center.x + ", y: " + _this._center.y + "} center 2: { x: " + _this._center2.x + ", y: " + _this._center2.y + "}\n";
        };
        _this._width = width;
        _this._orientation = orientation;
        _this._theta = (orientation / 360) * 2 * Math.PI;
        _this._center2 = {
            x: _this._center.x + _this._width * cos(_this._theta),
            y: _this._center.y + _this._width * sin(_this._theta)
        };
        _this._depth = depth;
        _this._type = 'Wall';
        return _this;
    }
    return AbstractWall;
}(obstacle_1.AbstractObject));
exports.AbstractWall = AbstractWall;
// This should be in wall.js after pera-swarm library migration
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall(width, height, orientation, originX, originY, depth, debug) {
        if (depth === void 0) { depth = 5; }
        if (debug === void 0) { debug = false; }
        var _this = _super.call(this, width, height, orientation, {
            x: originX,
            y: originY
        }, depth, debug) || this;
        _this.geometric = function () {
            return {
                center1: _this._center,
                center2: _this._center2,
                width: _this._width,
                height: _this._height,
                orientation: _this._orientation
            };
        };
        _this.getDistance = function (x, y, heading) {
            // TODO: Need to implement
            return 0;
        };
        _this.isInRange = function (heading, x, y, angleThreshold) {
            var from = { x: x, y: y };
            // Lets check the heading in between two center points
            var pA1 = _this._getAngle(from, _this._center);
            var pA2 = _this._getAngle(from, _this._center2);
            console.log("Calculated Angles: " + pA1 + ", " + pA2);
            var a1 = _this._angleDifference(heading, pA1);
            var a2 = _this._angleDifference(heading, pA2);
            console.log("heading: " + heading + ", a1:" + a1 + ", a2:" + a2);
            // TODO: Need proper logic to take the decision
            return false;
        };
        _this.visualize = function () {
            return [
                {
                    id: _this.id,
                    geometry: __assign({ type: 'BoxGeometry' }, _this.geometric()),
                    material: {
                        type: 'MeshStandardMaterial',
                        properties: {
                            color: '#505050'
                        }
                    },
                    position: {
                        x: (_this._center.x + _this._center2.x) / 2,
                        y: (_this._center.y + _this._center2.y) / 2
                    },
                    rotation: {
                        x: 0,
                        y: _this._orientation,
                        z: 0
                    }
                }
            ];
        };
        // -------------------- Private functions --------------------
        _this._getAngle = function (from, to) {
            if (obstacle_1.validateObjectCoordinate(from) && obstacle_1.validateObjectCoordinate(to)) {
                var xDiff = to.x - from.x;
                var yDiff = to.y - from.y;
                return lib_1.normalizeAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
            }
            else {
                throw new TypeError('Invalid arguments');
            }
        };
        _this._angleDifference = function (heading, angle) {
            // Get the absolute difference between heading and target angle
            var difference = (angle - heading) % 360;
            if (difference <= -180)
                difference += 360;
            if (difference > 180)
                difference -= 360;
            return difference;
        };
        if (debug) {
            console.log("Created: [\n " + _this.toString() + "] ");
        }
        return _this;
    }
    return Wall;
}(AbstractWall));
exports.Wall = Wall;

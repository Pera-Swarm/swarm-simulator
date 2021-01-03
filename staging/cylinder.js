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
exports.__esModule = true;
var lib_1 = require("pera-swarm/lib");
var obstacle_1 = require("./obstacle");
var _a = require('mathjs'), sqrt = _a.sqrt, pow = _a.pow, abs = _a.abs, round = _a.round, cos = _a.cos, sin = _a.sin, atan2 = _a.atan2, max = _a.max, asin = _a.asin;
var AbstractCylinder = /** @class */ (function (_super) {
    __extends(AbstractCylinder, _super);
    function AbstractCylinder(radius, height, center, debug) {
        var _this = _super.call(this, height, center, debug) || this;
        /**
         * Cylinder Object string representation
         */
        _this.toString = function () {
            return "  " + _this._type + " Obstacle\n   radius: " + _this._radius + " height: " + _this._height + "\n   center: { x: " + _this._center.x + ", y: " + _this._center.y + "}\n";
        };
        _this._radius = radius;
        _this._type = 'Cylinder';
        _this._geometryType = 'CylinderGeometry';
        _this._materialType = 'MeshStandardMaterial';
        return _this;
    }
    return AbstractCylinder;
}(obstacle_1.AbstractObject));
exports.AbstractCylinder = AbstractCylinder;
// This should be in cylinder.js after pera-swarm library migration
var Cylinder = /** @class */ (function (_super) {
    __extends(Cylinder, _super);
    function Cylinder(radius, height, originX, originY, debug) {
        if (debug === void 0) { debug = false; }
        var _this = _super.call(this, radius, height, { x: originX, y: originY }, debug) || this;
        _this.geometric = function () {
            return {
                center: _this.center,
                height: _this.height,
                radius: _this._radius
            };
        };
        /**
         * @param {number} heading heading value
         * @param {number} x x value
         * @param {number} y y value
         * @returns {number} the distance from the center of robot to the wall of the cylinder
         */
        _this.getDistance = function (heading, x, y) {
            // Return
            var from = { x: x, y: y };
            var dist = _this._point2PointDistance(from, _this.center);
            return max(dist - _this._radius, 0);
        };
        _this.isInRange = function (heading, x, y, angleThreshold) {
            if (angleThreshold === void 0) { angleThreshold = 0; }
            var from = { x: x, y: y };
            var head = lib_1.normalizeAngle(heading);
            // Angle from robot to obstacle
            var angle = _this._getAngle(from, _this.center);
            // Distance from robot to obstacle center
            var dist = _this._point2PointDistance(from, _this.center);
            // Angle difference of the tangents of the cylinder from its center
            var deltaT = dist > 0 ? abs(asin(_this._radius / dist) * (180 / Math.PI)) : 0;
            // Angles of the two tangents of the cylinder and the heading.
            // ___ 360 added to avoid corner cases
            // ___ angleThreshold is the allowed threshold from the cylinder edges
            var aCW = angle - deltaT + 360 - angleThreshold;
            var aCCW = angle + deltaT + 360 + angleThreshold;
            var aHeading = lib_1.normalizeAngle(head) + 360;
            if (_this._debug) {
                console.log("Calculated Angle: " + angle + ", deltaT: " + deltaT);
                console.log('heading:', head, 'CCW:', round(aCCW - 360, 2), 'CW:', round(aCW - 360, 2));
            }
            return aCW <= aHeading && aHeading <= aCCW;
        };
        _this.visualize = function () {
            return [
                {
                    id: _this.id,
                    geometry: {
                        type: _this.geometryType,
                        radiusTop: _this._radius,
                        radiusBottom: _this._radius,
                        height: _this.height
                    },
                    material: {
                        type: _this.materialType,
                        properties: {
                            color: '#505050'
                        }
                    },
                    position: {
                        x: _this.center.x,
                        y: _this.center.y
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    }
                }
            ];
        };
        // -------------------- Private functions --------------------
        _this._point2PointDistance = function (from, to) {
            if (obstacle_1.validateObjectCoordinate(from) && obstacle_1.validateObjectCoordinate(to)) {
                var xDiff = to.x - from.x;
                var yDiff = to.y - from.y;
                return round(sqrt(pow(xDiff, 2) + pow(yDiff, 2)), 2);
            }
            else {
                throw new TypeError('Invalid arguments');
            }
        };
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
    return Cylinder;
}(AbstractCylinder));
exports.Cylinder = Cylinder;

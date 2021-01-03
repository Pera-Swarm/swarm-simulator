'use strict';
exports.__esModule = true;
var uuid_1 = require('uuid');
/**
 * @class Obstacle Object
 * @classdesc Obstacle Object Representation
 */
var AbstractObject = /** @class */ (function () {
    function AbstractObject(height, center, debug) {
        if (debug === void 0) {
            debug = false;
        }
        this._id = uuid_1.v4();
        this._height = height;
        this._center = center;
        this._debug = debug;
        this._materialType = 'MeshStandardMaterial';
        this._created = new Date();
        this._updated = Date.now();
    }
    Object.defineProperty(AbstractObject.prototype, 'id', {
        /**
         * get id
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'height', {
        /**
         * get height
         */
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'center', {
        /**
         * get center coordinate
         */
        get: function () {
            return this._center;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'created', {
        /**
         * get created datetime
         */
        get: function () {
            return this._created;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'updated', {
        /**
         * get updated timestamp
         */
        get: function () {
            return this._updated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'type', {
        /**
         * get type
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'geometryType', {
        /**
         * get geometry type
         */
        get: function () {
            return this._geometryType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractObject.prototype, 'materialType', {
        /**
         * get material type
         */
        get: function () {
            return this._materialType;
        },
        enumerable: true,
        configurable: true
    });
    return AbstractObject;
})();
exports.AbstractObject = AbstractObject;

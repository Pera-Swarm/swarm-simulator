import { v4 as uuid } from 'uuid';

export type ObjectCoordinate = {
    x: number;
    y: number;
};

export type Appearance = {
    color: string;
};

/**
 * @class Obstacle Object
 * @classdesc Obstacle Object Representation
 */
export abstract class AbstractObject {
    protected _id: string;
    protected _height: number;
    protected _center: ObjectCoordinate;
    protected _type: string;
    protected _geometryType: string;
    protected _color: string;
    protected _materialType: string;
    protected _debug: boolean;
    protected _created: Date;
    protected _updated: number;

    constructor(height: number, center: ObjectCoordinate, debug: boolean = false) {
        this._id = uuid();
        this._height = height;
        this._center = center;
        this._debug = debug;
        this._type = 'Object';
        this._geometryType = 'Geometry';
        this._color = '#505050';
        this._materialType = 'MeshStandardMaterial';
        this._created = new Date();
        this._updated = Date.now();
    }

    /**
     * get id
     */
    get id(): string {
        return this._id;
    }

    /**
     * get height
     */
    get height(): number {
        return this._height;
    }

    /**
     * get center coordinate
     */
    get center(): ObjectCoordinate {
        return this._center;
    }

    /**
     * get created datetime
     */
    get created(): Date {
        return this._created;
    }

    /**
     * get updated timestamp
     */
    get updated(): number {
        return this._updated;
    }

    /**
     * get type
     */
    get type(): string {
        return this._type;
    }

    /**
     * get appearance properties
     */
    get appearance(): Appearance {
        return {
            color: this._color
        };
    }

    /**
     * get geometry type
     */
    get geometryType(): string {
        return this._geometryType;
    }

    /**
     * get material type
     */
    get materialType(): string {
        return this._materialType;
    }

    /**
     * set geometry type
     * @param geometry geometry type
     */
    setGeometry = (geometry: string) => {
        this._geometryType = geometry;
        this._updated = Date.now();
    };

    /**
     * set color
     * @param color color value
     */
    setColor = (color: string) => {
        this._color = color;
        this._updated = Date.now();
    };

    /**
     * set material type
     * @param material material type
     */
    setMaterial = (material: string) => {
        this._materialType = material;
        this._updated = Date.now();
    };

    /**
     * Obstacle Object string representation
     */
    abstract toString: Function;

    /**
     * return an array of geometric properties of the object};
     */
    abstract geometric: Function;

    /**
     * an array of properties need to be set in three.js object creation
     */
    abstract visualize: Function;

    /**
     * @returns {boolean} whether the object is in front of the source robot or not
     */
    abstract isInRange: Function;

    /**
     * @returns {number} distance from the given object to this obstacle
     */
    abstract getDistance: Function;
}

/**
 * method for validating an object coordinate.
 * @param {Coordinate} coordinate
 * @returns {boolean|-1} true if valid or -1 if not.
 */
export function validateObjectCoordinate<TId>(
    coordinate: ObjectCoordinate
): boolean | -1 {
    var validity: boolean | -1;
    var i: number;
    validity = -1;
    i = 0;
    if (Object.prototype.hasOwnProperty.call(coordinate, 'x')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'y')) {
        i += 1;
    }
    if (i === 2) {
        validity = true;
    }
    return validity;
}

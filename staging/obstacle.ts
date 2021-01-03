import { v4 as uuid } from 'uuid';

export type ObjectCoordinate = {
    x: number;
    y: number;
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
    protected _debug: boolean;
    protected _created: Date;
    protected _updated: number;

    constructor(height: number, center: ObjectCoordinate, debug: boolean = false) {
        this._id = uuid();
        this._height = height;
        this._center = center;
        this._debug = debug;
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

import { v4 as uuid } from 'uuid';
import { Reality } from '../../../types';

export type ObjectCoordinate = {
    x: number;
    y: number;
};

export type ObjectRotation = {
    x: number;
    y: number;
    z: number;
};

export type Appearance = {
    color: string;
};

export type MaterialType = {
    type: string;
    properties: Appearance;
};

export type VisualizeType = {
    id: string;
    reality: string;
    geometry: any;
    material: MaterialType;
    position: ObjectCoordinate;
    rotation: ObjectRotation;
};

/**
 * @class Obstacle Object
 * @classdesc Obstacle Object Representation
 */
export abstract class AbstractObstacle {
    protected _id: string;
    protected _type: string;
    protected _name: string;

    protected _position: ObjectCoordinate; /* center coordinate of the Obstacle */
    protected _color: string; /* color of the Obstacle */

    protected _geometryType: string;
    protected _materialType: string;

    protected _debug: boolean;
    protected _created: Date;
    protected _updated: number;

    protected _reality: string;

    protected constructor(
        position: ObjectCoordinate,
        reality: Reality,
        debug: boolean = false
    ) {
        this._id = uuid();
        this._position = position;

        // TODO: @luk3Sky, can you impelement this using name provided in env.config
        this._name = '';

        this._debug = debug;
        this._type = 'Object';
        this._geometryType = 'Geometry';
        this._color = '#404040';
        this._materialType = 'MeshStandardMaterial';
        this._created = new Date();
        this._updated = Date.now();

        this._reality = reality;
    }

    /**
     * get id
     */
    get id(): string {
        return `${this._id} (${this._type})`;
    }

    /**
     * get name
     */
    get name(): string {
        return `${this._name}`;
    }

    /**
     * get position coordinate
     */
    get position(): ObjectCoordinate {
        return this._position;
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
     * get reality (V or R)
     */
    get reality(): string {
        return this._reality;
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

    /**
     * @returns {string} color of the obstacle in format #RRGGBB
     */
    abstract getColor: Function;
}

/**
 * method for validating an object coordinate.
 * @param {Coordinate} coordinate
 * @returns {boolean|-1} true if valid or -1 if not.
 */
export function validateObjectCoordinate<TId>(
    coordinate: ObjectCoordinate
): boolean | -1 {
    let validity: boolean | -1;
    let i: number;
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

import { ColorSensor, DistanceSensor } from './';

/**
 * @type SensorValueType
 */
export type SensorValueType = number | string | number[] | string[];

/**
 * @type SensorReadingTypes
 */
export type SensorReadingTypes =
    | SensorReadingInt<number, number>
    | SensorReadingInt<number, number[]>
    | SensorReadingInt<string, string>
    | SensorReadingInt<string, string[]>;

/**
 * @type SensorsType
 */
export type SensorsType<TId> =
    | SensorModuleType<TId, number, number>
    | SensorModuleType<TId, number[], number>
    | SensorModuleType<TId, string, number>
    | SensorModuleType<TId, string[], number>;

/**
 * @interface SensorReading
 */
export interface SensorReading<T> {
    [key: string]: T;
}

/**
 * @interface SensorReadingInt
 */
export interface SensorReadingInt<TId, TValueType> {
    id: TId;
    value: TValueType;
    updated: number;
}

/**
 * @interface SensorModuleType
 */
export interface SensorModuleType<TId, TColor, TDistance> {
    color: Sensor<TId, TColor>;
    distance: Sensor<TId, TDistance>;
    updated: number;
}

/**
 * @interface SensorModuleType
 */
export interface SensorModuleInterface<TId, TColor, TDistance> {
    color: SensorReadingInt<TId, TColor>;
    distance: SensorReadingInt<TId, TDistance>;
    updated: number;
}

/**
 * @abstract
 * @class Sensor
 */
export abstract class Sensor<TId, TValueType> {
    protected _id: TId;
    protected _value: TValueType;
    protected _updated: number;
    protected _publishTopic: string;

    constructor(id: TId, value: TValueType, publishTopic: string = '') {
        this._id = id;
        if (value !== undefined) {
            this._value = value;
        } else {
            console.error(
                'Invalid argument. value argument must be one of number, number[] string or string[] types.'
            );
            this._value = value;
        }
        this._updated = Date.now();
        this._publishTopic = publishTopic;
    }

    /**
     * the coordinate id
     */
    get id(): TId {
        return this._id;
    }

    /**
     * the mqtt publish topic
     */
    get publishTopic(): string {
        return this._publishTopic;
    }

    /**
     * the coordinate updated
     */
    get updated(): number {
        return this._updated;
    }

    /**
     * @abstract sensor value
     */
    abstract get value(): SensorValueType;

    /**
     * method for getting sensor readings
     */
    getReading(): SensorReadingInt<TId, TValueType> {
        return {
            id: this._id,
            value: this._value,
            updated: this._updated
        };
    }

    abstract publish: Function;

    /**
     * method for setting sesnor readings
     * @param {string} mqtt publish topic value
     */
    setPublishTopic(topic: string) {
        if (topic === undefined) {
            throw new TypeError('publish topic is not specified');
        } else {
            this._publishTopic = topic;
        }
    }

    /**
     * method for setting sesnor readings
     * @param {TValueType} value sensor reading value
     */
    setReading(value: TValueType) {
        if (value === undefined) {
            throw new TypeError('value is not specified');
        } else {
            this._value = value;
            this._updated = Date.now();
        }
    }
}

/**
 * method for creating the sensor array
 * @param {number} id robot id
 */
export function sensors(id: number): SensorsType<number> {
    if (id === undefined) throw new TypeError('id unspecified');
    return {
        color: new ColorSensor(id),
        distance: new DistanceSensor(id),
        updated: Date.now()
    };
}

export const sensorModuleTypes: string[] = ['color', 'distance'];

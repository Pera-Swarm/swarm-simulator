import { Sensor } from '../';

/**
 * @type DistanceSensorValueType
 */
export type DistanceSensorValueType = number;

/**
 * @interface DistanceSensorType
 */
export interface DistanceSensorType {
    id: number;
    value: DistanceSensorValueType;
    updated: number;
}

/**
 * @class DistanceSensor
 */
export class DistanceSensor extends Sensor<number, DistanceSensorValueType> {
    /**
     * DistanceSensor constructor
     * @param {number} id robot id
     * @param {DistanceSensorValueType} value initial distance sensor reading
     */
    constructor(id: number, value?: DistanceSensorValueType) {
        super(id, value === undefined ? 0 : value);
    }

    /**
     * @override DistanceSensor values
     */
    get value(): DistanceSensorValueType {
        return this._value;
    }

    /**
     * method for setting the distance sensor data and get back the updated data
     * @param {DistanceSensorValueType} value distance sensor value
     */
    syncReading = (value: DistanceSensorValueType) => {
        this.setReading(value);
        // TODO: did some process to sync the value with virtual robots
        // Currently just echo back the readings
        return this.value;
    };
}

export * from './distance';

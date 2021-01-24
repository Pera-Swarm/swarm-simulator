import { Sensor } from '../index';

/**
 * @interface ColorSensorType
 */
export interface ColorSensorType {
    id: number;
    value: number[];
    updated: number;
}

/**
 * @class ColorSensor
 */
export class ColorSensor extends Sensor<number, number[]> {
    /**
     * ColorSensor constructor
     * @param {number} id robot id
     * @param {number[]} values color sensor values
     */
    constructor(id: number, values?: number[]) {
        super(id, values === undefined ? [0, 0, 0] : values);
    }

    /**
     * @override ColorSensor Values
     */
    get value(): number[] {
        return this._value;
    }

    /**
     * method for publishing the sensor readings
     */
    publish = (value: number, suffix: string = '') => {};

    /**
     * method for setting the solor sensor data and get back the updated data
     * @param {number[]} values color sensor value
     */
    syncReading = (values: number[]) => {
        this.setReading(values);
        // TODO: did some process to sync the value with virtual robots
        // Currently just echo back the readings
        return this.value;
    };
}

import { RGBType } from '../modules';

/**
 * method for normalizing a given angle
 * @param {number} a angle
 */
export const normalizeAngle = (a: number) => {
    let b = (a + 180) % 360;
    if (b <= 0) b += 360;
    b = b - 180;
    return b;
};

/**
 * method for normalizing a given value according within a range
 * @param {number} value
 * @param {number} minValue
 * @param {number} maxValue
 * @returns {number} normalized value
 */
export const normalizeValueRange = (
    value: number,
    minValue: number,
    maxValue: number
) => {
    console.log('value', value);
    console.log('minValue', minValue);
    console.log('maxValue', maxValue);

    if (value <= minValue) {
        return minValue;
    } else if (value >= maxValue) {
        return maxValue;
    } else {
        return value;
    }
};

/**
 * method for converting a hex value to RGB
 * @param {string} value color value in hex
 */
export const hexToRGB = (value: string = '#000000'): RGBType<number, number> | null => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16)
          }
        : null;
};

export * from './constants';

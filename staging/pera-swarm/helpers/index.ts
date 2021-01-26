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

export * from './constants';

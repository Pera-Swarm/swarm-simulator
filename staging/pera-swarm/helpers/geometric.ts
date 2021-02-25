import { CoordinateValueInt } from '../modules';
import { atan2, pow, round, sqrt } from 'mathjs';

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
    if (value <= minValue) {
        return minValue;
    } else if (value >= maxValue) {
        return maxValue;
    } else {
        return value;
    }
};

/**
 * method for obtaining a normalized angle
 * @param {CoordinateValueInt<number>} from
 * @param {CoordinateValueInt<number>} to
 * @returns {number} angle value
 */
export const getAngle = (
    from: CoordinateValueInt<number>,
    to: CoordinateValueInt<number>
): number => {
    const xDiff = to.x - from.x;
    const yDiff = to.y - from.y;
    return normalizeAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
};

/**
 * method for obtaining the distance between two coordinates
 * @param {CoordinateValueInt<number>} from
 * @param {CoordinateValueInt<number>} to
 * @returns {number} distance value
 */
export const getDistance = (
    from: CoordinateValueInt<number>,
    to: CoordinateValueInt<number>
): number => {
    const xDiff = to.x - from.x;
    const yDiff = to.y - from.y;
    return round(sqrt(Number(pow(xDiff, 2)) + Number(pow(yDiff, 2))), 2);
};

/**
 * method for obtaining the angle rolerance value
 * @param {number} dist
 * @param {number} width
 * @returns {number} angle tolerance value
 */
export const angleToleranceWithDistance = (dist: number, width: number): number => {
    const r = width / 2;
    const angleDiff = (Math.atan(r / dist) * 180) / Math.PI;
    return Math.round(angleDiff * 100) / 100;
};

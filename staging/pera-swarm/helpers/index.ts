import { RGBType, RGBCType } from '../modules';

/**
 * method for normalizing a given angle
 * @param {number} a angle
 */
export const realityResolver = (
    requestReality: 'R' | 'V' | 'M' | undefined,
    robotReality: 'R' | 'V' | undefined = undefined
) => {
    // console.log(`realityResolver: req:${requestReality},  robot:${robotReality}`);
    if (requestReality === undefined) {
        if (robotReality === undefined) {
            // Robot also not defined the reality
            return 'M';
        }
        if (robotReality === 'V') {
            // Virtual robots should need both realities
            return 'M';
        }

        if (robotReality === 'R') {
            // Physical robots only need virtual reality
            return 'V';
        }
        // return the robot's reality
        return robotReality;
    }

    if (requestReality == 'V' || requestReality == 'R' || requestReality == 'M') {
        // return the requested and valid reality
        return requestReality;
    }

    return 'M';
};

/**
 * method for converting a hex value to RGB+C
 * @param {string} value color value in hex, c is the average color reading
 */
export const hexToRGBC = (value: string = '#000000'): RGBCType<number, number> | null => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    // let r = parseInt(result[1], 16);
    // let g = parseInt(result[2], 16);
    // let b = parseInt(result[3], 16);
    // let c = Math.round((r + g + b) / 3);

    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16),
              C: Math.round(
                  (parseInt(result[1], 16) +
                      parseInt(result[2], 16) +
                      parseInt(result[3], 16)) /
                      3
              )
          }
        : null;
};
/**
 * method for converting a hex value to RGB
 * @param {string} value color value in hex
 */
export const hexToRGB = (value: string = '#000000'): RGBType<number, number> | null => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
    // let r = parseInt(result[1], 16);
    // let g = parseInt(result[2], 16);
    // let b = parseInt(result[3], 16);
    return result
        ? {
              R: parseInt(result[1], 16),
              G: parseInt(result[2], 16),
              B: parseInt(result[3], 16)
          }
        : null;
};

export * from './constants';
export * from './geometric';

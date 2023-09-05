import { hexToRGB } from '../../../helpers';
import { AbstractSensorEmulator } from './';
import { Robots } from '../../';

/**
 * @class VirtualColorSensorEmulator
 * @classdesc Virtual Color Sensor Emulator Representation
 */
export class VirtualColorSensorEmulator extends AbstractSensorEmulator {
    _distanceThreshold: number;

    constructor(robots: Robots, mqttPublish: Function, distanceThreshold: number) {
        super(robots, mqttPublish);
        this._distanceThreshold = distanceThreshold;
    }

    colorToRGB = (color: string) => {
        return hexToRGB(color);
    };

    defaultSubscriptions = () => {
        return [];
    };
}

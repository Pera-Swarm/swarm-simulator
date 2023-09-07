import { AbstractSensorEmulator } from './';
import { Robots } from '../../';

/**
 * @class VirtualDistanceSensorEmulator
 * @classdesc Virtual Distance Sensor Emulator Representation
 */
export class VirtualDistanceSensorEmulator extends AbstractSensorEmulator {
    constructor(robots: Robots, mqttPublish: Function) {
        super(robots, mqttPublish);
    }

    defaultSubscriptions = () => {
        return [];
    };
}

const { abs, cos, sin } = require('mathjs');
import { normalizeAngle } from '../../../helpers';
import { AbstractSensorEmulator } from './';
import { ArenaType } from '../../environment';
import { Robots } from '../../';

/**
 * @class VirtualColorSensorEmulator
 * @classdesc Virtual Color Sensor Emulator Representation
 */
export class VirtualColorSensorEmulator extends AbstractSensorEmulator {
    constructor(robots: Robots, mqttPublish: Function) {
        super(robots, mqttPublish);
    }

    defaultSubscriptions = () => {
        return [];
    };
}

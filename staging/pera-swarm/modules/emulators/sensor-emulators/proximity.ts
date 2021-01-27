const { abs, cos, sin } = require('mathjs');
import { normalizeAngle } from '../../../helpers';
import { AbstractSensorEmulator } from './';
import { ArenaType } from '../../environment';
import { Robots } from '../../';

/**
 * @class VirtualProximitySensorEmulator
 * @classdesc Virtual Proximity Sensor Emulator Representation
 */
export class VirtualProximitySensorEmulator extends AbstractSensorEmulator {
    constructor(robots: Robots, mqttPublish: Function) {
        super(robots, mqttPublish);
    }

    defaultSubscriptions = () => {
        return [];
    };
}

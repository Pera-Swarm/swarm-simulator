// import { normalizeAngle } from '../../../helpers/';
import { AbstractSensorEmulator } from './';
import { ArenaType } from '../../environment/';
import { Robots } from '../../';

const { abs, cos, sin } = require('mathjs');

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

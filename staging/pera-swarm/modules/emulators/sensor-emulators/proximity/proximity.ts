const { abs, cos, sin } = require('mathjs');
import { normalizeAngle } from '../../../../helpers';
import { AbstractSensorEmulator } from '..';
import { ArenaType } from '../../../environment';
import { Robots } from '../../../';

/**
 * @class VirtualProximitySensorEmulator
 * @classdesc Virtual Proximity Sensor Emulator Representation
 */
export class VirtualProximitySensorEmulator extends AbstractSensorEmulator {
    protected _robots: Robots;

    constructor(robots: Robots) {
        super();
        this._robots = robots;
    }

    defaultSubscriptions = () => {
        return [];
    };
}

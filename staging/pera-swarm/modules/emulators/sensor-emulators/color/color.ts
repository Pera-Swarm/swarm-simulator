const { abs, cos, sin } = require('mathjs');
import { normalizeAngle } from '../../../../helpers';
import { AbstractSensorEmulator } from '..';
import { ArenaType } from '../../../environment';
import { Robots } from '../../../';

/**
 * @class VirtualColorSensorEmulator
 * @classdesc Virtual Color Sensor Emulator Representation
 */
export class VirtualColorSensorEmulator extends AbstractSensorEmulator {
    protected _robots: Robots;

    constructor(robots: Robots) {
        super();
        this._robots = robots;
    }

    defaultSubscriptions = () => {
        return [];
    };
}

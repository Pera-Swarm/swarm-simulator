const { abs, cos, sin } = require('mathjs');
import { normalizeAngle } from '../../../../helpers/';
import { AbstractSensorEmulator } from '../';
import { ArenaType } from '../../../environment/';
import { Robots } from '../../../';

/**
 * @class VirtualDistanceSensorEmulator
 * @classdesc Virtual Distance Sensor Emulator Representation
 */
export class VirtualDistanceSensorEmulator extends AbstractSensorEmulator {
    protected _arena: ArenaType;
    protected _robots: Robots;

    constructor(
        robots: Robots,
        publish: Function,
        publishTopic: string = 'distance/',
        arena: ArenaType
    ) {
        super(publish, publishTopic);
        this._arena = arena;
        this._robots = robots;
    }

    defaultSubscriptions = () => {
        return [];
    };
}

const { abs, cos, sin } = require('mathjs');
import { normalizeAngle } from '../../../../helpers/';
import { AbstractSensorEmulator } from '../';
import { ArenaType } from '../../../environment/';

/**
 * @class VirtualDistanceSensorEmulator
 * @classdesc Virtual Distance Sensor Emulator Representation
 */
export class VirtualDistanceSensorEmulator extends AbstractSensorEmulator {
    protected _arena: ArenaType;

    constructor(publish: Function, publishTopic: string = 'distance/', arena: ArenaType) {
        super(publish, publishTopic);
        this._arena = arena;
    }

    defaultSubscriptions = () => {
        return [];
    };

    // Internal use only -------------------------------------------------------
    _getBorderDistance = (x: number, y: number, heading: number) => {
        //console.log( this._arena);
        const { xMin, xMax, yMin, yMax } = this._arena;
        let normalizedHeading: number = normalizeAngle(heading);

        let p1 = { x: xMax, y: yMin }; // lower right
        let p2 = { x: xMax, y: yMax }; // upper right
        let p3 = { x: xMin, y: yMin }; // lower left
        let p4 = { x: xMin, y: yMax }; // upper right

        // x and y interchanged due to coordinate system transform ???
        let angle1 = (-1 * Math.atan2(p1.y - y, p1.x - x) * 180) / Math.PI;
        let angle2 = (-1 * Math.atan2(p2.y - y, p2.x - x) * 180) / Math.PI;
        let angle3 = (-1 * Math.atan2(p3.y - y, p3.x - x) * 180) / Math.PI;
        let angle4 = (-1 * Math.atan2(p4.y - y, p4.x - x) * 180) / Math.PI;

        //console.log(`Pos x:${x} y:${y} Heading:${heading}`);
        //console.log('Ang:',angle1, angle2, angle3, angle4);

        if (normalizedHeading >= 0) {
            // Positive angles, Counter Clockwise
            if (normalizedHeading <= angle1) {
                //console.log('L1');
                return this._getLineDistance(x, y, normalizedHeading, 1);
            } else if (normalizedHeading <= angle3) {
                //console.log('L4');
                return this._getLineDistance(x, y, normalizedHeading, 4);
            } else {
                //console.log('L3');
                return this._getLineDistance(x, y, normalizedHeading, 3);
            }
        } else {
            // Minus angles, Clockwise
            if (normalizedHeading >= angle2) {
                return this._getLineDistance(x, y, normalizedHeading, 1);
            } else if (normalizedHeading >= angle4) {
                return this._getLineDistance(x, y, normalizedHeading, 2);
            } else {
                return this._getLineDistance(x, y, normalizedHeading, 3);
            }
        }
        return 0;
    };

    _getLineDistance = (x: number, y: number, heading: number, line: number) => {
        const { xMin, xMax, yMin, yMax } = this._arena;
        const theta = heading * (Math.PI / 180);

        if (line == 1) {
            return cos(theta) != 0 ? abs(x - xMax) / cos(theta) : abs(x - xMax);
        } else if (line == 2) {
            return sin(theta) != 0 ? (-1 * abs(y - yMin)) / sin(theta) : abs(y - yMin);
        } else if (line == 3) {
            return cos(theta) != 0 ? (-1 * abs(x - xMin)) / cos(theta) : abs(x - xMin);
        } else if (line == 4) {
            return sin(theta) != 0 ? abs(y - yMax) / sin(theta) : abs(y - yMax);
        }
        return NaN;
    };
}

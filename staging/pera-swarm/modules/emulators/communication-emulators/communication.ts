import { sqrt, pow, round, atan2 } from 'mathjs';
import { normalizeAngle } from '../../../helpers';
import { Coordinate, CoordinateValueInt } from '../../coordinate';
import { Robots } from '../../robots';
import { SensorsType, SensorValueType } from '../../sensors';

export interface CommunicationInterface {
    _mqttPublish: Function;
    _maxDistance: number;
    _debug: boolean;

    broadcast: Function;
    // ------------- Internal use only -------------
}

export abstract class AbstractCommunication<
    TId,
    TCoordinate,
    TCoordinateValueType,
    TSensors,
    TSensorsValueType
> implements CommunicationInterface {
    _mqttPublish: Function;
    _maxDistance: number;
    _debug: boolean;
    _robots: Robots;

    constructor(robots: Robots, mqttPublish: Function, maxDistance = 100, debug = false) {
        if (robots === undefined) console.error('robots unspecified');
        if (mqttPublish === undefined) console.error('mqttPublish unspecified');
        this._robots = robots;
        this._mqttPublish = mqttPublish;
        this._maxDistance = maxDistance;
        this._debug = debug;
    }

    abstract broadcast: Function;

    // Internal use only -------------------------------------------------------
    protected abstract _getDistance: Function;
    protected abstract _getAngle: Function;

    /**
     * method for finding whether a given distance value is within the max distance range
     * @param {number} dist distance value
     * @returns {boolean} whether a given distance is below the max distance or not
     */
    distanceCheck = (
        dist?: number,
        threshold: number | undefined = undefined
    ): boolean => {
        if (dist === undefined) {
            console.error('Distance unspecified');
            return false;
        }
        // TODO: test functionality
        if (threshold === undefined) return dist <= this._maxDistance;
        return dist <= threshold;
    };
}

export abstract class Communication extends AbstractCommunication<
    number,
    Coordinate<number>,
    CoordinateValueInt<number>,
    SensorsType<number>,
    SensorValueType
> {
    protected _getDistance = (
        from: CoordinateValueInt<number>,
        to: CoordinateValueInt<number>
    ): number | undefined => {
        if (
            Object.prototype.hasOwnProperty.call(from, 'x') &&
            Object.prototype.hasOwnProperty.call(from, 'y') &&
            Object.prototype.hasOwnProperty.call(to, 'x') &&
            Object.prototype.hasOwnProperty.call(to, 'y')
        ) {
            const xDiff = to.x - from.x;
            const yDiff = to.y - from.y;
            return round(sqrt(Number(pow(xDiff, 2)) + Number(pow(yDiff, 2))), 2);
        } else {
            console.error('Both parameters require coordinate values');
        }
    };

    abstract broadcast: Function;

    protected _getAngle = (
        from: CoordinateValueInt<number>,
        to: CoordinateValueInt<number>
    ): number | undefined => {
        if (
            Object.prototype.hasOwnProperty.call(from, 'x') &&
            Object.prototype.hasOwnProperty.call(from, 'y') &&
            Object.prototype.hasOwnProperty.call(to, 'x') &&
            Object.prototype.hasOwnProperty.call(to, 'y')
        ) {
            const xDiff = to.x - from.x;
            const yDiff = to.y - from.y;
            return normalizeAngle((atan2(yDiff, xDiff) * 180) / Math.PI);
        } else {
            console.error('Both parameters require coordinate values');
        }
    };
}

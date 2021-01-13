const { abs, round, cos, sin } = require('mathjs');
import { MqttClient } from 'mqtt';
import { DistanceSensor, DistanceSensorValueType } from '.';
import { normalizeAngle } from '../../../helpers';
import { VRobot } from '../../robot';

/* ------------------------------------------------------
Arena coordinate system (top view)

P1   L4  P2
┍━━━┑
L3 ┃   ┃ L1
┕━━━┛
P3  L2  P4

Axises: ↑ Y, → X
------------------------------------------------------ */

export class DistanceSensorModule extends DistanceSensor {
    protected _arena: any;
    protected _mqttClient: MqttClient;
    protected _publishTopic: string;

    constructor(
        id: number,
        arena: any,
        mqttClient: MqttClient,
        publishTopic: string = '',
        value?: DistanceSensorValueType
    ) {
        super(id, value);
        this._arena = arena;
        this._mqttClient = mqttClient;
        this._publishTopic = publishTopic;
    }

    getReadings = (robot: VRobot, suffix: string, callback: Function) => {
        const { x, y, heading } = robot.coordinates;
        robot.updateHeartbeat();
        console.log(x, y, heading);
        var dist = round(this._getBorderDistance(x, y, heading) * 10) / 10;
        if (this._publishTopic !== '') {
            this._mqttClient.publish(`${this._publishTopic}/${suffix}`, String(dist));
        }
        this.setReading(dist);
        if (callback != undefined) callback(dist);
    };

    viewReading = (robot: { getData: (arg0: string) => any } | undefined) => {
        if (robot === undefined) throw new TypeError('robot unspecified');
        const dist = robot.getData('distance');
        return dist != undefined ? dist : NaN;
    };

    // Internal use only -------------------------------------------------------

    _getBorderDistance = (x: number, y: number, heading: number) => {
        //console.log( this._arena);
        const { xMin, xMax, yMin, yMax } = this._arena;
        var normalizedHeading: number = normalizeAngle(heading);

        var p1 = { x: xMax, y: yMin }; // lower right
        var p2 = { x: xMax, y: yMax }; // upper right
        var p3 = { x: xMin, y: yMin }; // lower left
        var p4 = { x: xMin, y: yMax }; // upper right

        // x and y interchanged due to coordinate system transform ???
        var angle1 = (-1 * Math.atan2(p1.y - y, p1.x - x) * 180) / Math.PI;
        var angle2 = (-1 * Math.atan2(p2.y - y, p2.x - x) * 180) / Math.PI;
        var angle3 = (-1 * Math.atan2(p3.y - y, p3.x - x) * 180) / Math.PI;
        var angle4 = (-1 * Math.atan2(p4.y - y, p4.x - x) * 180) / Math.PI;

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

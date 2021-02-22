import { abs } from 'mathjs';
import { Route } from '../../../../mqtt-router';
import { CoordinateValueInt } from '../../coordinate';
import { Robots } from '../../robots';
import { Communication } from './';

export class DirectedCommunication extends Communication {
    protected _angleThreshold: number;

    constructor(
        robots: Robots,
        mqttPublish: Function,
        maxDistance: number,
        angleThreshold: number = 30,
        debug: boolean = false
    ) {
        super(robots, mqttPublish, maxDistance, debug);
        this._angleThreshold = angleThreshold;
        if (this._debug) {
            console.log('DirectedCommunication:Debug:', this._debug);
        }
    }

    /**
     * broadcast method
     * @param robotId {TId} robot id
     * @param message {string} message
     * @param callback {Function} callback function
     */
    broadcast = (
        robotId: string,
        message: string,
        distance: number,
        topic: string,
        callback: Function
    ) => {
        if (robotId === undefined) console.error('robotId unspecified');
        if (message === undefined) console.error('message unspecified');

        const allCoordinates = this._robots.getCoordinatesAll();
        const thisCoordinate = this._robots.getCoordinatesById(Number(robotId));
        let receivers = 0;
        let receiveList: number[] = [];

        allCoordinates.forEach(
            (coordinate: CoordinateValueInt<number>, index: number) => {
                if (thisCoordinate !== -1 && coordinate.id != thisCoordinate.id) {
                    const distCheck = this.distanceCheck(
                        this._getDistance(thisCoordinate, coordinate),
                        distance
                    );
                    const angleCheck = this.angleCheck(
                        thisCoordinate.heading,
                        this._getAngle(thisCoordinate, coordinate)
                    );

                    if (distCheck && angleCheck) {
                        receivers++;
                        receiveList.push(coordinate.id);
                    }
                }
            }
        );
        receiveList.forEach((id) => {
            if (this._debug) console.log(`robot #${id}: pass`);
            this._mqttPublish(`${topic}/${id}`, message);
        });

        if (callback != undefined) callback({ receivers: receivers });
    };

    /*
     * method contains the default subscription topics of the module.
     * this will be handled by mqtt-router
     */
    defaultSubscriptions = (): Route[] => {
        return [];
    };

    /**
     * method for checking the given angle value is within the accepted value range
     * @param {number} heading heading value
     * @param {number} angle angle value
     * @returns {boolean} the verification of angle
     */
    angleCheck = (heading: number, angle?: number): boolean => {
        // Get the absolute difference between robot heading and target robot's absolute angle
        if (angle === undefined) {
            console.error('Angle unspecified');
            return false;
        }
        let difference = (angle - heading) % 360;
        if (difference <= -180) difference += 360;
        if (difference > 180) difference -= 360;

        if (this._debug)
            console.log(`heading: ${heading}, angle:${angle}, diff:${difference}`);

        return abs(difference) <= this._angleThreshold / 2;
    };
}

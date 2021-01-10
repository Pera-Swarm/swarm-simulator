import { Client } from 'mqtt';
import { CoordinateValueInt } from '../coordinate';
import { Robots } from '../robots';
import { Communication } from './index';

export class SimpleCommunication extends Communication {
    constructor(robots: Robots, mqttClient: Client, maxDistance = 100, debug = false) {
        super(robots, mqttClient, maxDistance, debug);
    }

    /**
     * broadcast method
     * @param robotId {TId} robot id
     * @param message {string} message
     * @param callback {Function} callback function
     */
    broadcast = (robotId: number, message: string, callback: Function) => {
        if (robotId === undefined) throw new TypeError('robotId unspecified');
        if (message === undefined) throw new TypeError('message unspecified');

        const allCoordinates = this._robots.getCoordinatesAll();
        const thisCoordinate = this._robots.getCoordinatesById(robotId);
        var receivers = 0;

        allCoordinates.forEach(
            (coordinate: CoordinateValueInt<number>, index?: number) => {
                if (thisCoordinate !== -1 && coordinate.id !== thisCoordinate.id) {
                    const withinRange = this.distanceCheck(
                        this._getDistance(thisCoordinate, coordinate)
                    );
                    if (withinRange) {
                        // within the distance range, so send the messaage
                        receivers++;
                        if (this._debug) console.log(`robot #${coordinate.id}: pass`);
                        this._mqttClient.publish(
                            `v1/communication/${coordinate.id}`,
                            message
                        );
                    }
                }
            }
        );
        if (callback != undefined) callback({ receivers: receivers });
    };
}

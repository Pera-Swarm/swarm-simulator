import { Route } from '@pera-swarm/mqtt-router';
import { CoordinateValueInt } from '../../coordinate';
import { Robots } from '../../robots';
import { Communication } from './index';

export class SimpleCommunication extends Communication {
    constructor(robots: Robots, mqttPublish: Function, maxDistance = 100, debug = false) {
        super(robots, mqttPublish, maxDistance, debug);
        if (this._debug) {
            console.log('SimpleCommunication:Debug:', this._debug);
        }
    }

    /**
     * broadcast method
     * @param robotId {TId} robot id
     * @param message {string} message
     * @param topic {string} topic
     * @param callback {Function} callback function
     */
    broadcast = (
        robotId: number,
        message: string,
        distance: number,
        topic: string,
        callback: Function
    ) => {
        if (robotId === undefined) console.error('robotId unspecified');
        if (message === undefined) console.error('message unspecified');

        const allCoordinates = this._robots.getCoordinatesAll();
        const thisCoordinate = this._robots.getCoordinatesById(robotId);
        let receivers = 0;
        let receiveList: number[] = [];

        allCoordinates.forEach(
            (coordinate: CoordinateValueInt<number>, index?: number) => {
                if (thisCoordinate !== -1 && coordinate.id !== thisCoordinate.id) {
                    const distCheck = this.distanceCheck(
                        this._getDistance(thisCoordinate, coordinate),
                        distance
                    );
                    if (distCheck) {
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
}

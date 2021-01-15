import { Route } from '../../../mqtt-router';
import { CoordinateValueInt } from '../coordinate';
import { Robots } from '../robots';
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
     * @param callback {Function} callback function
     */
    broadcast = (robotId: number, message: string, callback: Function) => {
        if (robotId === undefined) console.error('robotId unspecified');
        if (message === undefined) console.error('message unspecified');

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
                        this._mqttPublish(`/communication/${coordinate.id}`, message);
                    }
                }
            }
        );
        if (callback != undefined) callback({ receivers: receivers });
    };

    /*
     * method contains the default subscription topics of the module.
     * this will be handled by mqtt-router
     */
    defaultSubscriptions = (): Route[] => {
        return [
            {
                topic: 'comm/out/simple',
                type: 'JSON',
                allowRetained: false,
                subscribe: true,
                publish: true,
                handler: (msg: any) => {
                    // The robots can transmit messages to other robots using a transmission protocol.
                    // Server will decide the robots who can receive the message
                    console.log('MQTT.Comm: comm/out/simple', msg);

                    this.broadcast(msg.id, msg.msg, (data: any) => {
                        console.log('Sent to', data.receivers, 'robots');
                    });
                }
            }
        ];
    };
}

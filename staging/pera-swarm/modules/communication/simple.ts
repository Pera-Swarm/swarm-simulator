import { Client } from 'mqtt';
import { CoordinateValueInt } from '../coordinate';
import { Robots } from '../robots';
import { Communication } from './index';

export class SimpleCommunication extends Communication {
    constructor(robots: Robots, mqttClient: Client, maxDistance = 100, debug = false) {
        super(robots, mqttClient, maxDistance, debug);
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

    /*
     * method contains the default subscription topics of the module.
     * Should be add to mqttRouter once module is created.
     */
    defaultSubscriptions = () => {
        // This is not a completed implementation. Please check @luk3Sky
        const that = this;
        return [
            {
                topic: 'comm/out/simple',
                allowRetained: false,
                subscribe: true,
                handler: (msg: any, that: any) => {
                    // this = SimpleCommunication
                    console.log(`Comm:Simple > robot ${msg.id} transmitted ${msg.msg}`);
                    that.broadcast(msg.id, msg.msg, () => {
                        console.log('Simple broadcast');
                    });
                }
            }
        ];
    };
}

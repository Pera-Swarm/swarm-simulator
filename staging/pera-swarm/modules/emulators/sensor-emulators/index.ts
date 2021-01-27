import { AbstractVirtualEmulator } from '../';
import { Robots } from '../../../';

/**
 * @class AbstractSensorEmulator
 * @classdesc Abstract Sensor Emulator Representation
 */
export abstract class AbstractSensorEmulator extends AbstractVirtualEmulator {
    protected _robots: Robots;
    protected _mqttPublish: Function;

    constructor(robots: Robots, mqttPublish: Function) {
        super();
        this._robots = robots;
        this._mqttPublish = mqttPublish;
    }

    publish = (topic: string, message: string) => {
        this._mqttPublish(topic, String(message));
    };

    abstract defaultSubscriptions: Function;
}

export * from './color';
export * from './distance';
export * from './proximity';

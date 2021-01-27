import { AbstractVirtualEmulator } from '../';
import { Robots } from '../../robots';

export abstract class AbstractAgentEmulator extends AbstractVirtualEmulator {
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

export * from './neopixel';

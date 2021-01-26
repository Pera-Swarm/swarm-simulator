import { AbstractVirtualEmulator } from '../';

export abstract class AbstractAgentEmulator extends AbstractVirtualEmulator {
    protected _publish: Function;
    protected _publishTopic: string;

    constructor(publish: Function, publishTopic: string = '') {
        super(publish, publishTopic);
        this._publish = publish;
        this._publishTopic = publishTopic;
    }

    abstract publish: (value: number, suffix?: string) => void;
    abstract defaultSubscriptions: Function;
}

export * from './neopixel';

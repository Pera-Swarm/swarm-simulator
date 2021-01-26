import { AbstractVirtualEmulator } from '../';

/**
 * @class AbstractSensorEmulator
 * @classdesc Abstract Sensor Emulator Representation
 */
export abstract class AbstractSensorEmulator extends AbstractVirtualEmulator {
    protected _publish: Function;
    protected _publishTopic: string;

    constructor(publish: Function, publishTopic: string = 'sensor') {
        super(publish, publishTopic);
        this._publish = publish;
        this._publishTopic = publishTopic;
    }

    abstract defaultSubscriptions: Function;
}

export * from './distance';

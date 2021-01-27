export interface ControllerInterface {
    defaultSubscriptions: Function;
}

export abstract class AbstractController {
    protected _publish: Function;
    protected _publishTopic: string;

    constructor(publish: Function, publishTopic: string = 'control') {
        this._publish = publish;
        this._publishTopic = publishTopic;
    }

    abstract defaultSubscriptions: Function;

    /**
     * method for publishing the sensor readings
     * @param {number} value message value
     * @param {string} suffix an optional mqtt topic suffix
     */
    publish = (value: number, suffix: string = '') => {
        this._publish(`${this._publishTopic}/${suffix}`, String(value));
    };
}

export * from './localization';

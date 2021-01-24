import { AbstractVirtualRelayModule } from '..';

export type RGBType<TId, TValue> = {
    id: TId;
    R: TValue;
    G: TValue;
    B: TValue;
};

/**
 * @class VirtualNeoPixelRelayModule
 * @classdesc Provides a General Virtual Neo Pixel Relay Module Representation
 */
export class VirtualNeoPixelRelayModule<TId, TValue> extends AbstractVirtualRelayModule {
    protected _publish: Function;
    protected _publishTopic: string;

    constructor(publish: Function, publishTopic: string = 'out/neopixel/') {
        super(publish, publishTopic);
        this._publish = publish;
        this._publishTopic = publishTopic;
    }

    /**
     * the mqtt publish topic
     */
    get topic(): string {
        return this._publishTopic;
    }

    /**
     * set the mqtt publish topic
     * @param {string} topic the mqtt publish topic
     */
    setTopic = (topic: string) => {
        this._publishTopic = topic;
    };

    updateNeoPixel = (robot: Object, R: TValue, G: TValue, B: TValue) => {};

    defaultSubscriptions = () => {
        return [];
    };
}

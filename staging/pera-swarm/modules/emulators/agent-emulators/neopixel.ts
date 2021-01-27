import { AbstractAgentEmulator } from './';
import { Robots } from '../../';

export type RGBType<TId, TValue> = {
    id?: TId;
    R: TValue;
    G: TValue;
    B: TValue;
};

/**
 * @class VirtualNeoPixelRelayModule
 * @classdesc Provides a General Virtual Neo Pixel Relay Module Representation
 */
export class VirtualNeoPixelEmulator<TId, TValue> extends AbstractAgentEmulator {
    protected _robots: Robots;

    constructor(robots: Robots) {
        super();
        this._robots = robots;
    }

    updateNeoPixel = (robot: Object, R: TValue, G: TValue, B: TValue) => {};

    defaultSubscriptions = () => {
        return [];
    };
}

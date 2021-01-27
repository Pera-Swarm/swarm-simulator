import { AbstractVirtualEmulator } from '../';

export abstract class AbstractAgentEmulator extends AbstractVirtualEmulator {
    constructor() {
        super();
    }

    abstract defaultSubscriptions: Function;
}

export * from './neopixel';

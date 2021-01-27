import { AbstractVirtualEmulator } from '../';

/**
 * @class AbstractSensorEmulator
 * @classdesc Abstract Sensor Emulator Representation
 */
export abstract class AbstractSensorEmulator extends AbstractVirtualEmulator {
    constructor() {
        super();
    }

    abstract defaultSubscriptions: Function;
}

export * from './color';
export * from './distance';
export * from './proximity';

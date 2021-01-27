export interface VirtualEmulatorInterface {
    defaultSubscriptions: Function;
}

export abstract class AbstractVirtualEmulator implements VirtualEmulatorInterface {
    constructor() {}

    abstract defaultSubscriptions: Function;
}

export * from './agent-emulators/';
export * from './sensor-emulators/';

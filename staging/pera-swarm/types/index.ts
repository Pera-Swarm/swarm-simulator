export enum Reality {
    R = 'R',
    V = 'V'
}

export enum ExtendedRealities {
    R = 'R',
    V = 'V',
    M = 'M'
}

export type TReality = Reality.R | Reality.V;

export enum TInstruction {
    ID = 'ID?',
    MODE = 'MODE',
    START = 'START',
    STOP = 'STOP',
    RESET = 'RESET'
}

export interface TPositionVector {
    x: number;
    y: number;
    heading: number;
}

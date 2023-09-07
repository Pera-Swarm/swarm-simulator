export enum Reality {
    R = 'R',
    V = 'V'
}

export enum ExtendedReality {
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

export enum ObstacleType {
    WALL = 'wall',
    BOX = 'box',
    CYLINDER = 'cylinder',
    CONE = 'cone'
}

export enum ObstacleMaterialTypes {
    MeshBasicMaterial = 'MeshBasicMaterial',
    MeshNormalMaterial = 'MeshNormalMaterial',
    MeshPhongMaterial = 'MeshPhongMaterial',
    MeshPhysicalMaterial = 'MeshPhysicalMaterial',
    MeshStandardMaterial = 'MeshStandardMaterial'
}

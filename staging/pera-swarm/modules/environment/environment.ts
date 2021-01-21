import { AbstractObject, AbstractObstacleController } from '../obstacles/';

export type ArenaType = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    units?: "virtual";
}

export type EnvironmentConfig = {
    arena: any;
    obstacles: AbstractObject[];
    channel: string;
}

/**
 * @abstract
 * @class AbstractEnvironment
 */
export abstract class AbstractEnvironment {
    _config: EnvironmentConfig;
    _obstacleController: AbstractObstacleController;
    _updated: number;

    constructor(config: EnvironmentConfig, obstacleController: AbstractObstacleController) {
        this._config = config;
        this._obstacleController = obstacleController;
        this._updated=Date.now();
    }

    /**
     * config
     */
    get config(){
        return this._config;
    }

    /**
     * obstacle controller
     */
    get obstacleController(){
        return this._obstacleController;
    }

    abstract updateConfig: Function;
}

export class Environment extends AbstractEnvironment {
    constructor(config: EnvironmentConfig, obstacleController: AbstractObstacleController) {
        super(config, obstacleController);
    };
    /**
     * method for updating environment config
     * @param {EnvironmentConfig} config environment config object
     */
    updateConfig =(config: EnvironmentConfig) => {
        if(validateEnvConfig(config) === true){
            this._config = config;
            this._updated = Date.now();
        }
    };
}

/**
 * method for validating a config object.
 * @param {EnvironmentConfig} config
 * @returns {boolean|-1} true if valid or -1 if not.
 */
export const validateEnvConfig = (config: EnvironmentConfig): boolean | -1 => {
    var validity: boolean | -1;
    var i: number;
    validity = -1;
    i = 0;
    if (Object.prototype.hasOwnProperty.call(config, 'arena')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(config, 'obstacles')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(config, 'channel')) {
        i += 1;
    }
    if (i === 3) {
        validity = true;
    }
    return validity;
}
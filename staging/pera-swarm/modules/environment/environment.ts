import fs from 'fs';
import {
    AbstractObstacle,
    AbstractObstacleController,
    VisualizeType
} from '../obstacles/';
import { ExtendedReality } from '../../types';

export type ArenaType = {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    units?: string | undefined;
};

export type EnvironmentConfig = {
    arena: any;
    obstacles: AbstractObstacle[];
    channel: string;
};

const defaultConfig = {
    arena: {
        xMin: 150,
        xMax: 150,
        yMin: 150,
        yMax: 150,
        units: 'virtual'
    },
    obstacles: [],
    channel: 'virtual'
};

/**
 * @abstract
 * @class AbstractEnvironment
 */
export abstract class AbstractEnvironment {
    _config: EnvironmentConfig | undefined;
    _obstacleController: AbstractObstacleController;
    _updated: number;

    constructor(
        obstacleController: AbstractObstacleController,
        config: EnvironmentConfig = defaultConfig
    ) {
        this._obstacleController = obstacleController;
        this._config = config;
        this._updated = Date.now();
    }

    /**
     * config
     */
    get config() {
        return this._config;
    }

    /**
     * obstacle controller
     */
    get obstacleController() {
        return this._obstacleController;
    }

    abstract readConfig: Function;
    abstract updateConfig: Function;
    abstract createObstacles: Function;
}

export class Environment extends AbstractEnvironment {
    constructor(obstacleController: AbstractObstacleController, file: string = '') {
        super(obstacleController);
        if (file !== '') {
            this._config = this.readConfig(file);
        }
    }

    /**
     * method for reading environment config
     * @param {string} file environment config file path string
     */
    readConfig = (file: string): EnvironmentConfig | undefined => {
        // Read config.json file
        let config: EnvironmentConfig;
        try {
            const jsonString = fs.readFileSync(file);
            // Converting to JSON
            config = JSON.parse(jsonString.toString());
            console.log('Config_Found!');
            // Validating configuration
            if (validateEnvConfig(config) === true) {
                console.log('Config validated!');
                return config;
            } else {
                throw new Error('Invalid config');
            }
        } catch (err) {
            // Check for errors
            console.error('Config_Read', err);
            return undefined;
        }
    };

    /**
     * method for updating environment config
     * @param {EnvironmentConfig} config environment config object
     */
    updateConfig = (config: EnvironmentConfig) => {
        if (validateEnvConfig(config) === true) {
            this._config = config;
            this._updated = Date.now();
        }
    };

    /**
     * method for creating obstacles in the environment according to the config
     * @param {Function} callback callback function
     */
    createObstacles = (callback: Function) => {
        if (validateEnvConfig(this.config) === true) {
            this.obstacleController.createObstaclesJSON(
                this.config?.obstacles,
                this.config?.arena
            );
            if (callback !== undefined)
                callback(this._obstacleController.visualizeObstacles());
        }
    };

    /**
     * method for obtaining all the obstacles in the environment configuration
     */
    getObstaclesList = (
        reality: ExtendedReality = ExtendedReality.M
    ): VisualizeType[] => {
        // TODO: TypeError for reality
        return this.obstacleController.visualizeObstacles(reality);
    };
}

/**
 * method for validating a config object.
 * @param {EnvironmentConfig|undefined} config
 * @returns {boolean|-1} true if valid or -1 if not.
 */
export const validateEnvConfig = (
    config: EnvironmentConfig | undefined
): boolean | -1 => {
    if (config === undefined) {
        console.error('Invalid config!');
        return -1;
    }
    let validity: boolean | -1;
    let i: number;
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
};

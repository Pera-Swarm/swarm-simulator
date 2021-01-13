import { SimpleLocalizationSystem } from '../..';
import { LocalizationSystem } from '../localization';
import { AbstractRobots, Robots, RobotListType } from '../robots';

/**
 * @abstract
 * @class AbstractSwarm
 */
export abstract class AbstractSwarm<TId> {
    _loc_system: LocalizationSystem | any;
    _robots: AbstractRobots<TId>;

    constructor(setup: Function) {
        this._loc_system = new SimpleLocalizationSystem();
        this._robots = new Robots();
    }

    /**
     * localization system
     */
    get localization(): LocalizationSystem | any {
        return this._loc_system;
    }

    /**
     * robots
     */
    get robots(): AbstractRobots<TId> {
        return this._robots;
    }

    get robotsList(): RobotListType {
        return this._robots.list;
    }

    abstract prune: Function;
    abstract mqttPublish: Function;
}

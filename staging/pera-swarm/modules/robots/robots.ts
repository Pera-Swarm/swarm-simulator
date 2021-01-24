import { VRobot as Robot, Coordinate } from '../../';
import { CoordinateValueInt } from '../coordinate';

export type RobotListType = {
    [k: number]: Robot;
};

/**
 * @abstract
 * @class Robots
 */
export abstract class AbstractRobots<TId> {
    protected _robotList: RobotListType;
    protected _size: number;
    protected _updated: number;
    protected _debug: boolean;

    /**
     * Robots constructor
     */
    constructor(debug: boolean = false) {
        this._robotList = {};
        this._size = 0;
        this._updated = Date.now();
        this._debug = debug;
    }

    /**
     * method for getting the robot robotList
     * @returns {number} the robot instances : are in the list
     */
    get list(): RobotListType {
        return this._robotList;
    }

    /**
     * method for getting the size of the robot robotList
     * @returns {number} the size of the robot instances : are in the list
     */
    get size(): number {
        return this._size;
    }

    abstract addRobot: Function;

    abstract createIfNotExists: Function;

    abstract isExistsRobot: Function;

    abstract isAliveRobot: Function;

    abstract findRobotById: Function;

    abstract removeRobot: Function;

    abstract getCoordinatesById: Function;

    abstract getCoordinateStringById: Function;

    abstract getCoordinatesAll: Function;

    abstract updateCoordinates: Function;

    abstract prune: Function;

    abstract broadcast: Function;

    abstract changeMode: Function;

    // TODO: add swarm functionality here
    // getSensorReadings
    // stopRobot
    // resetRobot
}

export class Robots extends AbstractRobots<number> {
    constructor(debug: boolean = false) {
        super(debug);
    }

    /**
     * robot builder method
     * @description you should override this method only if you're intending to use custom Robot classes
     * @param {number} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    robotBuilder = (id: number, heading: number, x: number, y: number): any => {
        return new Robot(id, new Coordinate(id, heading, x, y));
    };

    /**
     * method for adding a robot to the robotList
     * @param {number} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @returns {number} id : if successful
     * @returns -1 if not
     */
    addRobot = (
        id: number,
        heading: number = 0,
        x: number = 0,
        y: number = 0
    ): number => {
        if (id === undefined) throw new TypeError('id unspecified');

        // only add a robot if the id doesn't exist
        if (this.isExistsRobot(id) === false) {
            // robot doesn't exists
            this._robotList[id] = this.robotBuilder(id, heading, x, y);
            this._size += 1;
            return id;
        } else {
            return -1;
        }
    };

    /**
     * method for finding a robot exists in the robotList or not
     * @param {number} id robot id
     * @param {Function} callback a callback function
     * @returns {boolean} true : if it exists with the id
     * @returns false : if a robot doesn't exist with the id
     */
    createIfNotExists = (id: number, callback: Function): boolean => {
        if (id === undefined) throw new TypeError('id unspecified');
        if (this.isExistsRobot(id) == false) {
            // robot doesn't exists
            this.addRobot(id);
        }
        if (callback !== undefined) callback();
        return true;
    };

    /**
     * method for finding whether a robot exists in the robotList or not
     * @param {number} id robot id
     * @returns {boolean} whether a robot exists in the robotList or not
     */
    isExistsRobot = (id: number): boolean => {
        if (id === undefined) throw new TypeError('id unspecified');
        return this._robotList[id] != undefined;
    };

    /**
     * method for finding a robot alive or not
     * @param {number} id robot id
     * @param {number} interval considered time interval
     * @returns {boolean} true : if robot is alive
     * @returns false : if a robot doesn't alive
     */
    isAliveRobot = (id: number, interval: number): boolean => {
        if (id === undefined) throw new TypeError('id unspecified');
        if (interval === undefined) throw new TypeError('interval unspecified');
        // return this._robotList[id].isAlive(interval);
        return (
            this._robotList[id].updated >= Number(this._robotList[id].created) + interval
        );
    };

    /**
     * method for finding the robot by id
     * @param {number} id robot id
     * @returns {Robot|number} the robot instance : if it exists
     * @returns -1 : if it doesn't exist
     */
    findRobotById = (id: number): Robot | -1 => {
        if (id === undefined) throw new TypeError('id unspecified');
        let result = this._robotList[id];
        return result !== undefined ? result : -1;
    };

    /**
     * method for removing the robot by id
     * @param {number} id robot id
     * @param {Function} callback a callback function
     * @returns {boolean} true : if successful
     * @returns false : if it fails
     */
    removeRobot = (id: number, callback: Function): boolean => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.isExistsRobot(id)) {
            // remove the key along with the value.
            delete this._robotList[id];
            this._size--;
            this._updated = Date.now();
            if (callback !== undefined) callback();
            return true;
        }
        return false;
    };

    /**
     * method for getting the robot coordinates by id
     * @param {number} id robot id
     * @returns {CoordinateValueInt|number} the robot coordinates : if it exists
     * @returns -1 : if it doesn't exist
     */
    getCoordinatesById = (id: number): CoordinateValueInt<number> | -1 => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.isExistsRobot(id) === false) return -1;
        const robot = this.findRobotById(id);
        return robot !== -1 ? robot.coordinates : -1;
    };

    /**
     * method for getting the robot coordinate string by id
     * @param {number} id robot id
     * @returns {String|number} the robot coordinate string : if it exists
     * @returns -1 : if it doesn't exist
     */
    getCoordinateStringById = (id: number): string | number => {
        if (id === undefined) throw new TypeError('id unspecified');

        if (this.isExistsRobot(id) === false) return -1;
        const robot = this.findRobotById(id);
        if (robot !== -1) {
            const { x, y, heading } = robot.coordinates;
            return `${x} ${y} ${heading}`;
        } else {
            return -1;
        }
    };

    /**
     * method for getting the coordinates of all robots
     * @returns {Coordinate[]} current robot coordinates : that are existing in the list
     */
    getCoordinatesAll = (): CoordinateValueInt<number>[] => {
        let result = [];
        for (const key in this._robotList) {
            const robot = this.findRobotById(Number(key));
            if (robot !== -1) {
                result.push(robot.coordinates);
            }
        }
        return result;
    };

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {Coordinate[]} coordinates coordinate data
     */
    updateCoordinates = (coordinates: CoordinateValueInt<number>[]) => {};

    /**
     * method for updating the coordinates of the given robots coordinates data
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @param {Function} callback a callback function. 'id' will be given as a parameter
     */
    prune = (interval: number, callback: Function) => {};

    broadcast = (instType: string, value: string, options = {}) => {};

    changeMode = (mode: any, options = {}) => {};
}

import { AbstractCoordinateRobot, Coordinate, CoordinateValueInt } from 'pera-swarm';

/**
 * @class Robot Representation
 * @classdesc representing the specific robot level functionality in the Swarm Server
 */
export class Robot extends AbstractCoordinateRobot<
    number,
    Coordinate<number>,
    CoordinateValueInt<number>
> {
    _data: any[];
    created: Date;
    timestamp: number;

    /**
     * Robot constructor
     * @param {string} id robot id
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    constructor(id: number, heading: number, x: number, y: number) {
        super(id, new Coordinate(id, heading, x, y));
        this.created = new Date();
        this.timestamp = Date.now();

        // This is to keep the customized data in the robot object
        this._data = [];
    }

    /**
     * method for getting coordinates
     */
    get coordinates(): CoordinateValueInt<number> {
        return this._coordinates.values;
    }

    /**
     * method for getting data
     */
    get data() {
        return this._data;
    }

    /**
     * method for get a data by its key
     * @param {number} key key for the data
     * @returns {Object} the data object : if it exists
     * @returns undefined : if it doesn't exist
     */
    getData = (key: string | number): object => {
        if (key === undefined) throw new TypeError('key unspecified');
        // @ts-ignore
        return this._data[key];
    };

    /**
     * method for set a data by its key
     * @param {number} key key for the data object
     * @param {Object} the data object
     * @returns true
     */
    setData = (key: string | number, value: any) => {
        if (key === undefined) throw new TypeError('key unspecified');
        if (value === undefined) throw new TypeError('value unspecified');
        // @ts-ignore
        this._data[key] = value;
        return true;
    };

    /**
     * method for getting coordinates
     * @returns coordinate values
     */
    getCoordinates = () => {
        return this._coordinates.values;
    };

    /**
     * method for setting coordinates
     * @param {CoordinateValueInt<number>} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinates = (coordinate: CoordinateValueInt<number>) => {
        const { heading, x, y } = coordinate;
        this._coordinates.setCoordinates(heading, x, y);
        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this._updated = Date.now();
    };

    /**
     * method for setting coordinates
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     */
    setCoordinateValues = (heading: number, x: number, y: number) => {
        this._coordinates.setCoordinates(heading, x, y);
        //console.log(`Pos x:${x} y:${y} Heading:${heading}`)
        this._updated = Date.now();
    };

    /**
     * method for updating the heartbeat of the robot
     * @returns {number} updated datetime value
     */
    updateHeartbeat = (): number => {
        this._updated = Date.now();
        return this._updated;
    };

    /**
     * method for return the live status of the robot
     * @param {number} interval the maximum allowed time in 'seconds' for being counted as 'alive' for a robot unit
     * @returns {boolean} true : if the robot is counted as 'alive'
     * @returns false : if the robot is counted as 'dead'
     */
    isAlive = (interval: number): boolean => {
        if (interval === undefined) throw new TypeError('interval unspecified');
        const seconds = Math.floor((Date.now() - this.updated) / 1000);
        return seconds <= interval;
    };
}

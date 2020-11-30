// TODO: rearrange maybe??

class Coordinate {
    constructor(id, heading, x, y, z) {
        this.id = id;
        this.heading = heading;
        this.x = x;
        this.y = y;
        if (z !== undefined) this.z = z;
    }

    /**
     * method for setting coordinates
     * @param {number} heading heading coordinate
     * @param {number} x x coordinate
     * @param {number} y y coordinate
     * @param {number} z z coordinate
     */
    setCoordinates = (heading, x, y, z) => {
        this.heading = heading;
        this.x = Math.round(x*100)/100;
        this.y = Math.round(y*100)/100;
        if (z !== undefined) this.z = Math.round(z*100)/100;
    };

    /**
     * method for getting id
     */
    getId = () => {
        return this.id;
    };

    /**
     * method for getting coordinates
     */
    getCoordinates = () => {
        if (this.z !== undefined) {
            return {
                id: this.id,
                heading: this.heading,
                x: this.x,
                y: this.y,
                z: this.z
            };
        }
        return {
            id: this.id,
            heading: this.heading,
            x: this.x,
            y: this.y
        };
    };

    /**
     * method for getting extended coordinates
     */
    getCoordinatesEx = () => {
        return {
            heading: this.heading,
            x: this.x,
            y: this.y,
            z: this.z
        };
    };

    /**
     * method for resetting coordinates
     */
    reset = () => {
        this.heading = 0;
        this.x = 0;
        this.y = 0;
        if (this.z) {
            this.z = 0;
        }
    };
}

/**
 * method for validating a coordinate object.
 * returns true if valid or -1 if not.
 * @param {coordinate} coordinate
 */
const validateCoordinate = (coordinate) => {
    var i = 0;

    if (Object.prototype.hasOwnProperty.call(coordinate, 'id')) i++;
    if (Object.prototype.hasOwnProperty.call(coordinate, 'heading')) i++;
    if (Object.prototype.hasOwnProperty.call(coordinate, 'x')) i++;
    if (Object.prototype.hasOwnProperty.call(coordinate, 'y')) i++;

    if (i === 4) return true;
    return false;
};

module.exports = {
    Coordinate,
    validateCoordinate
};

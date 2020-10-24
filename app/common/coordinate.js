// TODO: rearrange maybe??

class Coordinate {
    constructor(id, heading, x, y, z) {
        this.id = id;
        this.heading = heading;
        this.x = x;
        this.y = y;
        if (z !== undefined) {
            this.z = z;
        }
    }

    /**
     * method for setting coordinates
     * @param {heading} heading_value
     * @param {x} x_value
     * @param {y} y_value
     * @param {z} z_value
     */
    setCoordinates = (heading, x, y, z) => {
        this.heading = heading;
        this.x = x;
        this.y = y;
        if (z !== undefined) {
            this.z = z;
        }
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
    var validity = -1,
        i = 0;
    if (Object.prototype.hasOwnProperty.call(coordinate, 'id')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'heading')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'x')) {
        i += 1;
    }
    if (Object.prototype.hasOwnProperty.call(coordinate, 'y')) {
        i += 1;
    }
    if (i === 4) {
        validity = true;
    }
    return validity;
};

module.exports = {
    Coordinate,
    validateCoordinate
};

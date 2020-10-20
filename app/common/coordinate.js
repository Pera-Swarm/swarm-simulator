class Coordinate {

    constructor(heading, x, y, z) {
        this.heading = heading;
        this.x = x;
        this.y = y;
        if(z !== undefined) {
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
        if(z !== undefined) {
            this.z = z;
        }
    }

    /**
     * method for getting coordinates
     */
    getCoordinates = () => {
        if(this.z !== undefined){
            return {
                heading: this.heading,
                x: this.x,
                y: this.y,
                z: this.z
            };
        }
        return {
            heading: this.heading,
            x: this.x,
            y: this.y
        };
    }

    /**
     * method for getting extended coordinates
     */
    getCoordinatesEx = () => {
        return {
            heading: this.heading,
            x: this.x,
            y: this.y,
            z: this.z
        }
    }

    /**
     * method for resetting coordinates
     */
    reset = () => {
        this.heading = 0;
        this.x = 0;
        this.y = 0;
        if(this.z){
            this.z = 0;
        }
    }
}

module.exports = Coordinate;

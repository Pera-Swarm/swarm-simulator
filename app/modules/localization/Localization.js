const { validateCoordinate, Coordinate } = require('../../common/coordinate');

class Localization {
    /**
     * Localization constructor
     */
    constructor() {
        this.list = [];
        this.updated = Date.now();
        this.timestamp = new Date();
    }

    /**
     * method for finding the index of a coordinate in the list by id.
     * this method will return the index of the coordinate if the id exists,
     * if not return -1.
     * @param {number} id robot id
     */
    findIndexById = (id) => {
        var found = -1,
            i = 0;
        for (var i = 0; i < this.list.length; i += 1) {
            if (this.list[i]['id'] === id) {
                return i;
            }
        }
        return found;
    };

    /**
     * method fot getting the coordinates list.
     */
    getCoordinates = () => {
        var coordinates = [];
        this.list.map((item) => {
            coordinates.push(item.getCoordinates());
        });
        return coordinates;
    };

    /**
     * method for finding the size of the coordinates list.
     */
    size = () => {
        return this.list.length;
    };

    /**
     * method for validating a coordinate.
     * @param {Coordinate} coordinate coordinate instance
     */
    validate = (coordinate) => {
        return validateCoordinate(coordinate);
    };

    /**
     * method for adding a coordinate to the coordinates list.
     * @param {Coordinate} coordinate coordinate instance
     */
    add = (coordinate) => {
        var status = -1;
        if (this.validate(coordinate) === true) {
            if (this.findIndexById(coordinate.id) === -1) {
                // push, if the coordinate is not in list
                status = this.list.push(
                    new Coordinate(
                        coordinate.id,
                        coordinate.heading,
                        coordinate.x,
                        coordinate.y
                    )
                );
                this.updated = Date.now();
            } else {
                // update the list by calling #updateOne()
                status = this.updateOne(coordinate);
            }
        }
        return status;
    };

    /**
     * method for updating the coordinates list.
     * this method will return true if the update is successful,
     * if not return -1.
     * @param {Coordinate[]} coordinates
     */
    update = (coordinates) => {
        if (Array.isArray(coordinates)) {
            // if {coordinates} is an coordinate array, call #updateMany()
            return this.updateMany(coordinates);
        } else if (this.validate(coordinates)) {
            // if {coordinate} is a coordinate, call #updateOne()
            return this.updateOne(coordinates);
        } else {
            // invalid
            return -1;
        }
    };

    /**
     * method for updating the coordinates list.
     * this method will return true if the update is successful,
     * if not return -1.
     * @param {Coordinate} coordinate coordinate instance
     */
    updateOne = (coordinate) => {
        // use only #updateByIndex() to update the coordinate values,
        // to ensure all are valid coordinate object instances.
        return this.updateByIndex(this.findIndexById(coordinate.id), coordinate);
    };

    /**
     * method for updating the coordinates list.
     * this method will recursively update the coordinates list.
     * @param {Coordinate[]} coordinates array of coordinates
     */
    updateMany = (coordinates) => {
        var status = -1;
        // update if only the param is an array
        if (Array.isArray(coordinates)) {
            for (var i = 0; i < coordinates.length; i += 1) {
                if (this.findIndexById(coordinates[i]['id']) === -1) {
                    // add to list
                    status = this.add(coordinates[i]);
                    if (status !== -1) {
                        status = true;
                    }
                } else {
                    // update list
                    status = this.updateOne(coordinates[i]);
                }
            }
        }
        return status;
    };

    /**
     * method for updating a coordinate in the list by id.
     * this method will return true if the update is successful,
     * if not return -1.
     * @param {number} index index of coordinate list
     * @param {Coordinate} coordinate coordinate instance
     */
    updateByIndex = (index, coordinate) => {
        // neglect if the index is invalid or doesn't equal to {coordinate.id}
        if (index >= this.size() || index < 0) {
            return -1;
        } else if (this.list[index]['id'] !== coordinate.id) {
            return -1;
        } else {
            if (this.validate(coordinate) === true) {
                // update the particular coordinate by calling #setCoordinates() method
                this.list[index].setCoordinates(
                    coordinate.heading,
                    coordinate.x,
                    coordinate.y
                );
                this.updated = Date.now();
                return true;
            }
        }
        // this.
    };
}

module.exports = Localization;

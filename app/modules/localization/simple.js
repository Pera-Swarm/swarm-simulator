const Localization = require('./Localization');

class SimpleLocalizationSystem {

    constructor() {
        this.localization = new Localization();
        this.ids = [];
    }

    /**
     * method fot getting the coordinates list.
     */
    getCoordinates = () => {
        return this.localization.getCoordinates();
    }

    /**
     * method fot getting the ids list.
     */
    getIds = () => {
        return this.ids;
    }

    /**
     * method for checking a given id exists in the ids list.
     */
    idExists = (id) => {
        var findNaN = id !== id;
        var indexOf;
        if(!findNaN && typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function(id) {
                var i = -1, index = -1;
                for(i = 0; i < this.length; i++) {
                    var item = this[i];
                    if((findNaN && item !== item) || item === id) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }
        return indexOf.call(this.ids, id) > -1;
    }

    /**
     * method for returning the size of the coordinates list.
     */
    size = () => {
        return this.localization.size();
    }

    /**
     * method for adding a coordinate to the coordinates list.
     * @param {coordinate} coordinate
     */
    add = (coordinate) => {
        if(coordinate && coordinate.id) {
            this.localization.add(coordinate);
            this.ids.push(coordinate['id']);
        };
    };

    /**
     * method for updating the coordinates list.
     * this method will add/update the given coordinates to the localization list.
     * @param {coordinates} coordinates
     * supported coordinates types : array, valid_coordinate_object
     */
    update = (coordinates) => {
        var status = this.localization.update(coordinates);
        if (status === true) {
            if (Array.isArray(coordinates)) {
                coordinates.map((item) => {
                    if (this.idExists(item['id']) === false) {
                        this.ids.push(item['id']);
                    }
                })
            }
        }
        return status;
    }

}

module.exports = SimpleLocalizationSystem;

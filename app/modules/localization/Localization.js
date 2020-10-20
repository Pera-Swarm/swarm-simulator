class Localization {

    constructor() {
        this.list = [];
        this.updated = Date.now();
        this.timestamp = new Date();
    }

    /**
     * method for adding a coordinate to the coordinates list.
     * this method will call the start of the defined base mode at the end.
     * @param {setup} setup_function
     * @param {flow} flow_function
     * @param {interval} interval_for_flow_repitetion
     * @param {name} mode_name
     */
    add = (coordinate) => {
        if(coordinate) {
            this.list.push(coordinate);
        };
    };

    /**
     * method fot getting the coordinate list.
     */
    getCoordinates = () => {
        var coordinates = [];
        this.list.map((item) => {
            coordinates.push(item.getCoordinates());
        });
        return coordinates;
    }

    /**
     * method for returning the size of the coordinates list.
     */
    size = () => {
        return this.list.length;
    }

}

module.exports = Localization;

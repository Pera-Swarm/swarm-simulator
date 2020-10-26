class Mode {
    /**
     * Mode constructor
     * @param {function} setup a function that runs at start
     * @param {function} flow a function that runs periodically
     * @param {number} interval the time interval of the flow function runs on
     * @param {string} name name of the mode
     */
    constructor(setup, flow, interval, name) {
        this.setup = setup;
        this.flow = flow;
        this.interval = interval;
        this.name = name;
    }

    /**
     * method for starting the mode
     */
    start = () => {
        this.setup();
        setInterval(() => {
            this.flow();
        }, this.interval);
    };
}

module.exports = Mode;

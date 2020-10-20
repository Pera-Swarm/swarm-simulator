class Mode {
    constructor(setup, flow, interval, name) {
        this.setup = setup;
        this.flow = flow;
        this.interval = interval;
        this.name = name;
    }

    /**
     * method start
     */
    start = () => {
        this.setup();
        setInterval(() => {
            this.flow();
        }, this.interval);
    }
}

module.exports = Mode;
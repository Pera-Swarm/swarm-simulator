const Mode = require('./mode');

var mode;

/**
 * method for defining custom a base mode for swarm server with a custom parameters.
 * this method will call the start of the defined base mode at the end.
 * @param {function} setup a function that runs at start
 * @param {function} flow a function that runs periodically
 * @param {number} interval the time interval of the flow function runs on
 * @param {string} name name of the mode
 */
const defineBaseMode = (setup, flow, interval, name) => {
    if (name === undefined) {
        name = 'base-mode';
    }
    mode = new Mode(setup, flow, interval, name);
    console.log(`${name} initiated`);
    mode.start();
};

/**
 * method for starting custom a base mode for swarm server with a custom parameters.
 * this method will call the start of the defined base mode at the end.
 * @param {function} setup a function that runs at start
 * @param {function} flow a function that runs periodically
 * @param {number} interval the time interval of the flow function runs on
 * @param {string} name name of the mode
 */
const start = (setup, flow, interval, name) => {
    if (interval === undefined) {
        interval = 100;
    }
    if (name === undefined) {
        name = 'base mode';
    }
    mode = new Mode(setup, flow, interval, name);
    mode.start();
};

module.exports = {
    defineBaseMode,
    start
};

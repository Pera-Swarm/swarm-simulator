const Mode = require('./mode');

var mode;

/**
 * method for defining custom a base mode for swarm server with a custom parameters.
 * this method will call the start of the defined base mode at the end.
 * @param {setup} setup_function
 * @param {flow} flow_function
 * @param {interval} interval_for_flow_repitetion
 * @param {name} mode_name
 */
const defineBaseMode = (setup, flow, interval, name) => {
    if(name === undefined) {
        name = 'base-mode';
    }
    mode = new Mode(setup, flow, interval, name);
    console.log(mode);
    mode.start();
};

/**
 * method for starting custom a base mode for swarm server with a custom parameters.
 * this method will call the start of the defined base mode at the end.
 * @param {setup} setup_function
 * @param {flow} flow_function
 * @param {interval} interval_for_flow_repitetion
 * @param {name} mode_name
 */
const start = (setup, flow, interval, name) => {
    if(interval === undefined) {
        interval = 100;
    }
    if(name === undefined) {
        name = 'base mode';
    };
    mode = new Mode(setup, flow, interval, name);
    mode.start();
};

module.exports = {
    defineBaseMode,
    start
}

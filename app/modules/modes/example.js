const { Mode, defineBaseMode, start } = require('./');

const exampleSetup = () => {
    console.log('setup fn');
};

const exampleFlow = () => {
    console.log('flow fn');
};

new Mode(exampleSetup, exampleFlow, 10000, 'server-mode').start();
defineBaseMode(exampleSetup, exampleFlow);
start(exampleSetup, exampleFlow, 1000, 'my-custom-mode');

const { registerID } = require('./services/http/app.js');
const {
    move,
    moveSpecific,
    stop,
    reset
} = require('./services/motor/index');
console.log('Initiated');

var coordinates = {
    head: 0,
    x: 0,
    y: 0
}

setInterval(() => {
    console.log('Running...');

    registerID((id) => {
        console.log(id);
    });

    coordinates = move(coordinates);
    console.log(coordinates);

}, 1000);

const { setup } = require('./services/protocols');
const { move, moveSpecific, stop, reset } = require('./services/motor/');
const logger = require('./logger/winston');

var coordinates = {head: 0,x: 0,y: 0}
var robotId = undefined;

logger.info('Initiated ROBOT(%s) instance with coordinates: %s', robotId, coordinates);

setInterval(() => {
    if(robotId === undefined){
        logger.info('main: ROBOT ID Registration initial');
        setup.registerId((success, id) => {
            if(success){
                robotId = id;
                logger.info('main: ROBOT ID Registration success (%s)', id);
            }else{
                logger.warn('main: ROBOT ID Registration failed (%s)', id);
            }
        });
    }else{
        coordinates = move(coordinates);
        logger.info('main: Executing ROBOT(%s) instance with coordinates: %s', robotId, coordinates);
    }

}, 1000);

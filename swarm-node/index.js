const { setup } = require('./services/protocols');
const { move, moveSpecific, stop, reset } = require('./services/motor/');
const logger = require('./logger/winston');
const Robot = require('./robot');

var robot = new Robot();

setInterval(() => {
    if(robot.getId() === undefined){
        logger.log('debug', 'main: ROBOT ID Registration initial');
        setup.registerId((success, id) => {
            if(success){
                robot.setId(id);
                logger.log('info', 'main: ROBOT ID Registration success (%s)', id);
                setup.startMQTT();
            }else{
                logger.log('warn', 'main: ROBOT ID Registration failed (%s)', id);
            }
        });
    }else{
        // coordinates = move(coordinates);
        // logger.info('main: Executing ROBOT(%s) instance with coordinates: %s', robotId, coordinates);
    }

}, 100);

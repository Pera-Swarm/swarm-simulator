const { client: httpClient } = require('../http/');
const { client: mqttClient } = require('../mqtt/');
const logger = require('../../logger/winston');

const registerId = (callback) => {
    let ids;
    logger.info('protocol.setup.registerId: initial');
    httpClient.getIds((response) => {
        if(response !== undefined){
            ids = response;
            // allocate some id | 10 for now
            const id = 10;
            callback(true, id);
            logger.info('protocol.setup.registerId: ids:%s assignedId:%s', ids, id);
        }else{
            callback(false, undefined);
            logger.info('protocol.setup.registerId: unsupported response', ids, id);
        }
    });
}

const startMQTT = () => {
    mqttClient.start();
}

module.exports = {
    registerId,
    startMQTT
}

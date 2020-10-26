const axios = require('axios');
const logger = require('../../../logger/winston');

var serverUrl = 'http://' + process.env.HTTP_HOST + ':' + process.env.HTTP_PORT;

const getIds = (callback) => {
    var success = false;
    var res = undefined;

    axios
        .get(serverUrl)
        .then((response) => {
            success = true;
            res = response.data;
            logger.info('services.http.client.getIds: response(%s)', res);
        })
        .catch((error) => {
            logger.error(error);
        })
        .then(() => {
            if (success) {
                callback(res);
            }
        });
};

module.exports = {
    getIds
};

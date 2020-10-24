const client = require('./client');
const publisher = require('./publisher');
const subscriber = require('./subscriber');

const sendMsgToController = (req, callback) => {
    data = req.body;
    mqtt.publish('v1/controller/' + req.body.id, JSON.stringify(req.body), function () {
        console.log('mqtt: v1/controller/' + req.body.id);
        callback({ message: 'Success' });
    });
};

module.exports = {
    client,
    // sendMsgToController,
    publisher,
    subscriber
};

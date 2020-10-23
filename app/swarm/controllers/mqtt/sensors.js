const routes = [
    {
        topic: 'v1/sensor/distance',
        handler: (mqtt, topic, msg, robots) => {
            data = JSON.parse(msg);
            console.log('Sensor picked up the topic', data, robots);
        }
    }
];

module.exports = routes;

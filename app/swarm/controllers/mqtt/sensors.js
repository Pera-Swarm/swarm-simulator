// TODO: define every sensor handlers here
// 'robots' argument will be added via wrapper

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

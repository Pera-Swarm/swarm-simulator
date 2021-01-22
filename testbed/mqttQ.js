const { MQTTRouter } = require('../dist/mqtt-router/index');
const mqttClient = require('mqtt');
const mqttConfig = require('../app/config/mqtt.config');
const mqtt = mqttClient.connect(mqttConfig.HOST, mqttConfig.mqttOptions);
var queue = require('queue');

var q = queue({ results: [] });
var router;

// Sample dynamic route list with handler functions
const SAMPLE_ROUTES = [
    {
        topic: 'sample',
        allowRetained: true,
        subscribe: true,
        publish: false,
        type: 'JSON',
        handler: (msg) => {
            try {
                var data = JSON.parse(msg);
                console.log(
                    `Default Subscriber(${SAMPLE_ROUTES[0].topic}) picked up the message`,
                    data
                );
            } catch (err) {
                console.log('Handler error:', err);
            }
        },
        fallbackRetainHandler: () => {
            console.log('Fallback method');
        }
    },
    {
        topic: 'sample-2',
        allowRetained: true,
        subscribe: true,
        publish: false,
        type: 'String',
        handler: (msg) => {
            try {
                console.log(`Sample subscriber handler picked up the message`, msg);
            } catch (err) {
                console.log('Handler error:', err);
            }
        },
        fallbackRetainHandler: () => {
            console.log('Fallback method');
        }
    }
];

// Sample MQTT Options
const SAMPLE_OPTIONS = { qos: 2, rap: false, rh: true };

// Sample setup function that runs on connect
const SAMPLE_SETUP_FN = () => {
    console.log('sample setup fn');
};

// Sample MQTT Error handler function
const SAMPLE_ON_ERROR_FN = (err) => {
    console.log('error: mqtt');
    console.log(err);
};

router = new MQTTRouter(
    mqtt,
    SAMPLE_ROUTES,
    SAMPLE_OPTIONS,
    SAMPLE_SETUP_FN,
    SAMPLE_ON_ERROR_FN
);

router.start();

const samplePublishMessages = [
    {
        topic: 'sample-2',
        data: 'Sample Data 1'
    },
    {
        topic: 'sample-2',
        data: 'Sample Data 2'
    },
    {
        topic: 'sample-2',
        data: 'Sample Data 3'
    },
    {
        topic: 'sample-2',
        data: 'Sample Data 4'
    },
    {
        topic: 'sample-2',
        data: 'Sample Data 5'
    },
    {
        topic: 'sample-2',
        data: 'Sample Data 6'
    }
];

// samplePublishMessages.forEach((element) => {
//     router.pushToPublishQueue(element.topic, element.data);
// });

q.timeout = 1000;

q.push(function (cb) {
    setTimeout(function () {
        console.log('slow job finished');
        cb(null, 'published <timestamp>');
    }, 200);
});

// get notified when jobs complete
q.on('success', function (result, job) {
    console.log('job finished processing:', job.toString().replace(/\n/g, ''));
    console.log('The result is:', result);
});

q.on('timeout', function (next, job) {
    console.log('job timed out:', job);
    next();
});

// begin processing, get notified on end / failure
q.start(function (err) {
    if (err) throw err;
    console.log('all done:', q.results);
});

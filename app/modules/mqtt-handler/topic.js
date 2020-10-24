/**
 * method for subscribing to a given topic with options
 * @param {mqtt} mqtt_connection
 * @param {topic} topic
 * @param {options} mqtt_message_options
 */
const subscribeToTopic = (mqtt, topic, options) => {
    mqtt.subscribe(topic, options);
};

/**
 * method for publishing a message to a given topic with options and a callback funtion
 * @param {mqtt} mqtt_connection
 * @param {message} message
 * @param {options} mqtt_message_options
 * @param {callback} callback_function
 */
const publishToTopic = (mqtt, message, options, callback) => {
    mqtt.publish(topic, message, options, () => {
        if (callback !== undefined) {
            callback();
        }
    });
};

module.exports = {
    subscribeToTopic,
    publishToTopic
};

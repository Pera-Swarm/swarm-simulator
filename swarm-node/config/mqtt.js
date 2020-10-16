module.exports = {
   HOST: process.env.MQTT_HOST,
   options: {
      port: 1883,
      clientId: process.env.MQTT_CLIENT,
      // username: process.env.MQTT_USER,
      // password: process.env.MQTT_PASS,
   }
}

require('dotenv').config()

const axios = require('axios');

const db = require("./services/database.js");
const app = require("./services/express")
const mqtt = require("./services/mqtt.js");
const cron = require("./services/cron.js");

app.start()
mqtt.start();

cron.begin(mqtt);

// force:true to drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
   console.log("sequalize: started");
});

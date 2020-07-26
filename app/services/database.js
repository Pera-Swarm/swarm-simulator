
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
   host: dbConfig.HOST,
   dialect: dbConfig.dialect,
   operatorsAliases: false,
   logging: false,
   pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
   },
   timezone: '+05:30'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.controller = require("../models/control.model.js")(sequelize, Sequelize);
db.log = require("../models/log.model.js")(sequelize, Sequelize);

module.exports = db;

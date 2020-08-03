
module.exports = (sequelize, Sequelize) => {
   const SystemLog = sequelize.define("system_log", {
      id: {
         type: Sequelize.INTEGER(11).UNSIGNED,
         primaryKey: true,
         autoIncrement: true
      },
      type:{
         type: Sequelize.ENUM('CONTROLLER','SENSOR','WEB','OTHER')
      },
      priority:{
         type: Sequelize.INTEGER(2).UNSIGNED
      },
      message:{
         type: Sequelize.TEXT
      }
   },{
      timestamps: true,
      updatedAt: false,
      tableName: "system_log"
   });

   return SystemLog;
};

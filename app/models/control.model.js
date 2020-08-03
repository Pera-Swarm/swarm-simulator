
module.exports = (sequelize, Sequelize) => {
   const Control = sequelize.define("controller", {
      id: {
         type: Sequelize.INTEGER.UNSIGNED,
         primaryKey: true,
         autoIncrement: true
      },
      controllerId: {
         type: Sequelize.INTEGER(5).UNSIGNED
      },
      blower: {
         type: Sequelize.ENUM('0','1')
      },
      mist: {
         type: Sequelize.ENUM('0','1')
      },
      irrigation: {
         type: Sequelize.ENUM('0','1')
      },
      curtain: {
         type: Sequelize.ENUM('0','1','2')
      },
      version: {
         type: Sequelize.INTEGER(2).UNSIGNED
      }
   },
   {
      timestamps: true,
      updatedAt: false,
      tableName: "controller_log"
   });

   return Control;
};

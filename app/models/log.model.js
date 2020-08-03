const { DataTypes, Model } = require('sequelize');

module.exports = function (sequelize, Sequelize) {
    class Log extends Model {}
    Log.init({
        type: {
            type: DataTypes.STRING
        },
        priority: {
            type: DataTypes.INTEGER
        },
        message: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    }, {
        sequelize, // the connection instance
        modelName: 'Log' // The model name
    });
    return Log;
};

const { DataTypes, Model } = require('sequelize');

module.exports = function (sequelize, Sequelize) {
    class Control extends Model {}
    Control.init({
        controllerId: {
            type: DataTypes.STRING
        },
        blower: {
            type: DataTypes.STRING
        },
        mist: {
            type: DataTypes.STRING
        },
        irrigation: {
            type: DataTypes.STRING
        },
        curtain: {
            type: DataTypes.STRING
        },
        version: {
            type: DataTypes.DOUBLE
        },
        log: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modified: {
            type: DataTypes.STRING
            // allowNull defaults to true
        }
    }, {
        sequelize, // the connection instance
        modelName: 'Control' // The model name
    });

    return Control;
};

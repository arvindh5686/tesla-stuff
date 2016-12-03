'use strict';

module.exports = ConfigString;

function ConfigString(sequelize, DataTypes) {
    return sequelize.define('Config_String',
        {
            configuration: DataTypes.STRING,
            model: DataTypes.STRING
        },
        {
            freezeTableName: true,
            classMethods: {},
            instanceMethods: {}
        }
  );
}

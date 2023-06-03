const { DataTypes, sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      physicalDifficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        defaultValue: "1",
        allowNull: false,
      },
  
      technicalDifficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        defaultValue: "1",
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        defaultValue: "1",
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("Spring", "Summer", "Fall", "Winter"),
        allowNull: false,
      },
  
    }, {
      freezeTableName: true //esta propiedad sirve par que no se modifique el nombre de la base de datos poniendola en plural por defecto
    },
    {
      timestamps: false
    });
  };
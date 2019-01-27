'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alumne = sequelize.define('Alumne', {
    nom: DataTypes.STRING,
    cognoms: DataTypes.STRING,
    mail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {});
  Alumne.associate = function(models) {
    Alumne.belongsToMany(models.Assignatura, {through: 'AssignaturaAlumne'});
    Alumne.hasMany(models.Notes, {foreignKey: 'AlumneId'})
  };
  return Alumne;
};
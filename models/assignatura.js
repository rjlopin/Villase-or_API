'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignatura = sequelize.define('Assignatura', {
    nom: DataTypes.STRING,
    professor: DataTypes.STRING
  }, {});
  Assignatura.associate = function(models) {
    Assignatura.belongsToMany(models.Alumne, {through: 'AssignaturaAlumne'});
    Assignatura.hasMany(models.Notes, {foreignKey: 'AssignaturaId'})
  };
  return Assignatura;
};
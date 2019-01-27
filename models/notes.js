'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    nota: DataTypes.INTEGER
  }, {});
  Notes.associate = function(models) {
    Notes.belongsTo(models.Alumne);
    Notes.belongsTo(models.Assignatura);
  };
  return Notes;
};
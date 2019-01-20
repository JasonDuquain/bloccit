'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
    topicRule: {
      type: DataTypes.STRING,
      onDelete: 'CASCADE',
      references: {
        model: 'Topics',
        key: 'rule',
        as: 'topicRule'
      }
    }  
  }, {});
  Rule.associate = function(models) {
    // associations can be defined here
      Rule.belongsTo(models.Topic, {
        foreignKey: "topicId",
        onDelete: "CASCADE"
    })
  };
  return Rule;
};
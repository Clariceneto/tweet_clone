const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Tweet = sequelize.define('Tweet', {
  content: {
    type: DataTypes.STRING(280),
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'tweets',
  timestamps: true
});

Tweet.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Tweet, { foreignKey: 'userId' });

module.exports = Tweet;

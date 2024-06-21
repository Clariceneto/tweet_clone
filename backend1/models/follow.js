const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Follow = sequelize.define('Follow', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },

}, {
  tableName: 'follows',
  timestamps: true
});

Follow.belongsTo(User, { as: 'User', foreignKey: 'userId' });
Follow.belongsTo(User, { as: 'Followed', foreignKey: 'followId' });
User.hasMany(Follow, { as: 'Followers', foreignKey: 'followId' });
User.hasMany(Follow, { as: 'Following', foreignKey: 'userId' });

module.exports = Follow;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Tweet = require('./tweet');

const Like = sequelize.define('Like', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  tweetId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tweet,
      key: 'id'
    }
  }
}, {
  tableName: 'likes',
  timestamps: true
});

Like.belongsTo(User, { foreignKey: 'userId' });
Like.belongsTo(Tweet, { foreignKey: 'tweetId' });
User.hasMany(Like, { foreignKey: 'userId' });
Tweet.hasMany(Like, { foreignKey: 'tweetId' });

module.exports = Like;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Tweet = require('./tweet');

const Comment = sequelize.define('Comment', {
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
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'comments',
  timestamps: true
});

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Tweet, { foreignKey: 'tweetId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Tweet.hasMany(Comment, { foreignKey: 'tweetId' });

module.exports = Comment;

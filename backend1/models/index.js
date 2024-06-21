const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Tweet = require('./tweet');
const Like = require('./like');
const Follow = require('./follow');
const Comment = require('./comment');

const initModels = async () => {
  await sequelize.sync();
};

module.exports = { initModels, User, Tweet, Like, Follow,Comment, Sequelize };

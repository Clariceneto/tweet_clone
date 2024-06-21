const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('twitter_clone', 'root', 'teamo19C', {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;

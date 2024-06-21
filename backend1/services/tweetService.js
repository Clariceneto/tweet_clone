const { Tweet, User } = require('../models');

const createTweet = async (content, imageUrl, userId) => {
  try {
    const tweet = await Tweet.create({ content, imageUrl, userId });
    return tweet;
  } catch (error) {
    throw new Error('Error creating tweet');
  }
};

const getTweets = async (count) => {
  try {
    const tweets = await Tweet.findAll({
      limit: parseInt(count, 10),
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['username'] }],
    });
    return tweets;
  } catch (error) {
    throw new Error('Error fetching tweets');
  }
};

module.exports = { createTweet, getTweets };

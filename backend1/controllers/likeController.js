const { Like, Tweet, User } = require('../models');

const likeTweet = async (req, res) => {
  try {
    const { tweetId } = req.body;
    const userId = req.user.id;

    const like = await Like.create({ userId, tweetId });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const { tweetId } = req.body;
    const userId = req.user.id;

    const like = await Like.findOne({ where: { userId, tweetId } });
    if (!like) {
      return res.status(404).json({ error: 'Like not found' });
    }

    await like.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { likeTweet, unlikeTweet };

const { Follow, User } = require('../models');

const followUser = async (req, res) => {
  const { followId } = req.body;
  const userId = req.user.id;

  try {
    const existingFollow = await Follow.findOne({ where: { userId, followId } });
    if (existingFollow) {
      return res.status(400).json({ error: 'User already followed' });
    }

    const follow = await Follow.create({ userId, followId });
    res.status(201).json(follow);
  } catch (error) {
    console.error('Error following user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const { followId } = req.body;
    const userId = req.user.id;

    const follow = await Follow.findOne({ where: { userId, followId } });
    if (!follow) {
      return res.status(404).json({ error: 'Follow not found' });
    }

    await follow.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getFollowers = async (req, res) => {
  try {
    const userId = req.user.id;
    const followers = await Follow.findAll({ where: { followId: userId }, include: [{ model: User, as: 'User', attributes: ['username'] }] });
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { followUser, unfollowUser, getFollowers };

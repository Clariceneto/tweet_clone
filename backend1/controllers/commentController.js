const { Comment } = require('../models');

const createComment = async (req, res) => {
  const { tweetId, content } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.create({ userId, tweetId, content });
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCommentsByTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const comments = await Comment.findAll({ where: { tweetId } });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createComment, getCommentsByTweet };

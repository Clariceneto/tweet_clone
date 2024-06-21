const express = require('express');
const { createComment, getCommentsByTweet } = require('../controllers/commentController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createComment);
router.get('/tweet/:tweetId', authenticate, getCommentsByTweet);

module.exports = router;

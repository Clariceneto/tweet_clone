const express = require('express');
const { likeTweet, unlikeTweet } = require('../controllers/likeController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/like', authenticate, likeTweet);
router.post('/unlike', authenticate, unlikeTweet);

module.exports = router;

const express = require('express');
const { followUser, unfollowUser, getFollowers } = require('../controllers/followController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/follow', authenticate, followUser);
router.post('/unfollow', authenticate, unfollowUser);
router.get('/followers', authenticate, getFollowers);

module.exports = router;

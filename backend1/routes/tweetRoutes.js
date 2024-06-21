const express = require('express');
const { getAllTweets, createTweet, updateTweet, deleteTweet ,getTweetById,searchTweets} = require('../controllers/tweetController');
const authenticate = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', authenticate, getAllTweets);
router.post('/', authenticate, upload.single('image'), createTweet);
router.put('/:id', authenticate, updateTweet);
router.delete('/:id', authenticate, deleteTweet);
router.get('/:id', authenticate, getTweetById); 
router.get('/search', authenticate, searchTweets);

module.exports = router;

const express = require('express');
const { getUserProfile, updateUserProfile, deleteUser, getAllProfiles } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);
router.delete('/profile', authenticate, deleteUser);
router.get('/profile', authenticate, getAllProfiles); 

module.exports = router;

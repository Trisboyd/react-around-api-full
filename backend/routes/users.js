const router = require('express').Router();
const {
  getUser, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

// gets all users
router.get('/users', getUser);

// gets specific user based on id provided in url
router.get('/users/:id', getProfile);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

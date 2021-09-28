const router = require('express').Router();
const {
  getUser, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

// gets all users
router.get('/users', getUser);

// router.get('/users/:id', getProfile);

router.get('/users/me', getProfile);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

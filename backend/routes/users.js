const router = require('express').Router();
const {
  getUser, getProfile, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

// gets all users
router.get('/users', getUser);

// gets specific user based on id provided in url
router.get('/users/:id', getProfile);

// creates user
router.post('/users', createUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

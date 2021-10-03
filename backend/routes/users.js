// dependency based constants
const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

// function for validating URL
function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

const router = require('express').Router();
const {
  getUser, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

// ROUTES_________________________________________________________________________________

router.get('/users', getUser);

router.get('/users/me', getProfile);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().custom(validateUrl),
  }),
}), updateAvatar);

module.exports = router;

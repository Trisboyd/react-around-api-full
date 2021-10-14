// dependency based constants
const validator = require('validator');
const { Joi, celebrate } = require('celebrate');

const router = require('express').Router();

// function for validating URL
function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// ROUTES_________________________________________________
router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
}), deleteCard);

router.put('/cards/likes/:cardId', celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
}), likeCard);

router.delete('/cards/likes/:cardId', celebrate({
  body: Joi.object().keys({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
}), dislikeCard);

module.exports = router;

// imports from within director
const card = require('../models/card');
const NotFoundError = require('../middleware/errors/notFoundError');
const RequestError = require('../middleware/errors/requestError');
const ForbiddenError = require('../middleware/errors/forbiddenError');

// EXPORTED FUNCTIONS________________________________________________________________EXPORTS

// function for getting cards from database
module.exports.getCards = (req, res, next) => {
  card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

// function for creating cards
module.exports.createCard = (req, res, next) => {
  const {
    name, link,
  } = req.body;
  card.create({
    name, link, owner: req.user._id,
  })
    .then((cards) => {
      if (!cards) {
        throw new RequestError('Invalid card information');
      }
      res.send({ data: cards });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Card does not exist'); })
    .then((cardData) => res.send({ cardData }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Card does not exist'); })
    .then((cardData) => res.send({ cardData }))
    .catch(next);
};

// find card by Id and check owner Id against current owner id
// then delete card

// possible check if user is card owner to delete card
module.exports.deleteCard = (req, res, next) => {
  card.findById(req.params.cardId)
    .then((cardInfo) => {
      if (cardInfo.owner.toString() === req.user._id) {
        card.findByIdAndRemove(req.params.cardId)
          .orFail(() => { throw new NotFoundError('Card does not exist'); })
          .then((cards) => res.send({ data: cards }))
          .catch(next);
      } else throw ForbiddenError('Only card owners may delete their cards');
    });
};

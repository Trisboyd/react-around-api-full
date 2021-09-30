const card = require('../models/card');
const { checkError } = require('./checkError');

// function for getting cards from database
module.exports.getCards = (req, res) => {
  card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((error) => checkError(error, res));
};

// function for creating cards
module.exports.createCard = (req, res) => {
  const {
    name, link,
  } = req.body;
  card.create({
    name, link, owner: req.user._id,
  })
    .then((cards) => res.send({ data: cards }))
    .catch((error) => checkError(error, res));
};

module.exports.likeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true },
  )
    .orFail(() => { res.status(404).send({ message: 'Card does not exist' }); })
    .then((cardData) => res.send({ data: cardData }))
    .catch((error) => checkError(error, res));
};

module.exports.dislikeCard = (req, res) => {
  card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .orFail(() => { res.status(404).send({ message: 'Card does not exist' }); })
    .then((cardData) => res.send({ data: cardData }))
    .catch((error) => checkError(error, res));
};

// find card by Id and check owner Id against current owner id
// then delete card

// possible check if user is card owner to delete card
module.exports.deleteCard = (req, res) => {
  card.findById(req.params.id)
    .then((cardInfo) => {
      if (cardInfo.owner._id.toString() === req.user._id) {
        card.findByIdAndRemove(req.params.id)
          .orFail(() => { res.status(404).send({ message: 'Card does not exist' }); })
          .then((cards) => res.send({ data: cards }))
          .catch((error) => checkError(error, res));
      } else res.status(403).send({ message: 'Only card owners may delete their cards' });
    });
};

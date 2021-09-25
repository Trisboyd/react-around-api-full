const user = require('../models/user');
const { checkError } = require('./checkError');

// function for getting user from database
module.exports.getUser = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => checkError(error, res));
};

module.exports.getProfile = (req, res) => {
  user.findById(req.params.id)
    .then((userProfile) => {
      if (!userProfile) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.send({ data: userProfile });
      }
    })
    .catch((error) => checkError(error, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;
  user.create({
    name, about, avatar,
  })
    .then((newUser) => res.send({ data: newUser }))
    .catch((error) => checkError(error, res));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true })
    .then((userProfile) => {
      if (!userProfile) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.send({ data: userProfile });
      }
    })
    .catch((error) => checkError(error, res));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((userProfile) => {
      if (!userProfile) {
        res.status(404).send({ message: 'User does not exist' });
      } else {
        res.send({ data: userProfile });
      }
    })
    .catch((error) => checkError(error, res));
};

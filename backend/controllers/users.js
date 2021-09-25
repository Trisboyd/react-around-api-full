const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { checkError } = require('./checkError');

// function for getting user from database
module.exports.getUser = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((error) => checkError(error, res));
};

// finds specific user in database
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

module.exports.logIn = (req, res) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((userInfo) => {
      const token = jwt.sign({ _id: userInfo._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};

// create a new user
module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => res.send({ data: newUser }))
    .catch((error) => checkError(error, res));
};

// update the name or description
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

// update the avatar
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

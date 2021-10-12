const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const NotFoundError = require('../middleware/errors/notFoundError');
const AuthError = require('../middleware/errors/authError');
const RequestError = require('../middleware/errors/requestError');

// ______________________________________________function for getting user from database
module.exports.getUser = (req, res, next) => {
  user.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

// ______________________________________________________ finds specific user in database
module.exports.getProfile = (req, res, next) => {
  user.findById(req.user._id)
    .then((userProfile) => {
      if (!userProfile) {
        throw new NotFoundError('User does not exist');
      } else {
        return res.send({ userProfile });
      }
    })
    .catch(next);
};

// ____________________________________________________update the name or description
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  user.findByIdAndUpdate(req.user._id,
    { name, about },
    { new: true, runValidators: true })
    .then((userProfile) => {
      if (!userProfile) {
        throw new NotFoundError('User does not exist');
      } else {
        res.send({ userProfile });
      }
    })
    .catch(next);
};

// _____________________________________________________update the avatar
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((userProfile) => {
      if (!userProfile) {
        throw new NotFoundError('User does not exist');
      } else {
        res.send({ data: userProfile });
      }
    })
    .catch(next);
};

// ____________________________________________these controllers require NO authorization

module.exports.logIn = (req, res, next) => {
  const { email, password } = req.body;
  return user.findUserByCredentials(email, password)
    .then((userInfo) => {
      if (!userInfo) {
        throw new AuthError('Incorrect email or password');
      } else {
        const token = jwt.sign({ _id: userInfo._id }, 'secret-key', { expiresIn: '7d' });
        res.send({ token });
      }
    })
    .catch(next);
};

// create a new user
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      if (!newUser) {
        throw new RequestError('Invalid email or password');
      }
      res.send({ data: newUser });
    })
    .catch(next);
};

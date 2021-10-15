const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const AuthError = require('../middleware/errors/authError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Francisco Coronado',
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email',
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  about: {
    type: String,
    default: 'Conquistador',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://cdn.history.com/sites/2/2013/11/henry-hudson-A.jpeg',
    validate: {
      validator(v) {
        return /(https|http):\/\/(w{3}?\.)?[-a-z0-9+&@#/%?=~_|!:,.;]*/.test(v);
      },
      message: 'Please enter a valid url',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((userInfo) => {
      if (!userInfo) {
        return Promise.reject(new AuthError('Incorrect email or password'));
      }
      return bcrypt.compare(password, userInfo.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Incorrect email or password'));
          }
          return userInfo;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

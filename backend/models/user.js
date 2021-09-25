const mongoose = require('mongoose');
const validator = require('validator');

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
      validate(v) {
        return validator.isEmail(v);
      },
      message: 'Please enter a valid email',
    },
  },
  password: {
    type: String,
    required: true,
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

module.exports = mongoose.model('user', userSchema);

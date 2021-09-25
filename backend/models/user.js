const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(https|http):\/\/(w{3}?\.)?[-a-z0-9+&@#/%?=~_|!:,.;]*/.test(v);
      },
      message: 'Please enter a valid url',
    },
  },
});

module.exports = mongoose.model('user', userSchema);

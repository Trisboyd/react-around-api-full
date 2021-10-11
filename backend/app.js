// dependency based constants___________________________________________________constants
const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const cors = require('cors');
const { Joi, celebrate, errors } = require('celebrate');

// loggers
const { requestLogger, errorLogger } = require('./middleware/logger');

// function for validating URL
function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

// function for validating email
function validateEmail(string) {
  return validator.isEmail(string);
}

const app = express();

// using CORS
app.use(cors());
app.options('*', cors());

// routes containing request controllers
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middleware/auth');
const { logIn, createUser } = require('./controllers/users');

// PORT
const { PORT = 3000 } = process.env;

// connect to mongo database
mongoose.connect('mongodb://localhost:27017/aroundb');

// Setup for app
app.use(express.json());

app.use(express.urlencoded());

// ROUTES_________________________________________________________________________________ROUTES

app.use(requestLogger); // needed to log all requests

// routes for login and new user registration
app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(validateEmail),
  }),
}), logIn);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    // name: Joi.string().required().min(2).max(30),
    // about: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
    // avatar: Joi.string().required().custom(validateUrl),
  }),
}), createUser);

// all following routes require authorization as dictated by .use(auth)
app.use(auth);

app.use(usersRouter);

app.use(cardsRouter);

// ERRORS_____________________________________________________________________________ERRORS

// log all errors with Winston
app.use(errorLogger);

// error handler for sending errors to the client produced by celebrate
app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'An error occurred on the server' : message });
});

// listen for correct port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

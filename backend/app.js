// dependency based constants___________________________________________________constants
const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');
const cors = require('cors');
const { Joi, celebrate, errors } = require('celebrate');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

// access key for json web token from environment variable stored in .env
console.log(process.env.NODE_ENV);

// loggers
const { requestLogger, errorLogger } = require('./middleware/logger');

// function for validating email
function validateEmail(string) {
  if (!validator.isEmail(string)) {
    throw new Error('Invalid email');
  }
  return string;
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

// testing function for server crash and pm2 restart
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

// routes for login and new user registration
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
  }),
}), logIn);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required(),
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

app.use(errorHandler);

// listen for correct port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

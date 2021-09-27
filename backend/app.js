const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorRouter = require('./routes/errors');

const auth = require('./middleware/auth');

const { login, createUser } = require('./controllers/users');
// const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.use(express.urlencoded());

app.use((req, res, next) => {
  req.user = {
    _id: '61310d4d84185bd11146403e',
  };

  next();
});

app.use(usersRouter);

app.use(cardsRouter);

app.use('*', errorRouter);

// all following routes require authorization
app.use(auth);

// routes for login and new user registration
app.post('/signin', login);

app.post('/signup', createUser);

// listen for correct port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

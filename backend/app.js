const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const auth = require('./middleware/auth');

const { logIn, createUser } = require('./controllers/users');
// const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(express.json());

app.use(express.urlencoded());

// routes for login and new user registration
app.post('/signin', logIn);

app.post('/signup', createUser);

// app.use('*', errorRouter);

// all following routes require authorization as dictated by .use(auth)
app.use(auth);

app.use(usersRouter);

app.use(cardsRouter);

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'An error occurred on the server' : message });
});

// listen for correct port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

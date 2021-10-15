const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode)
    .send({ message: (error.statusCode === 500) ? 'An error occurred on the server' : error.message });
  next();
};

module.exports = errorHandler;

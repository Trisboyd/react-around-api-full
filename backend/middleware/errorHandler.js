const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.status(statusCode)
    .send({ message: statusCode === 500 ? 'An error occurred on the server' : message });
};

module.exports = errorHandler;

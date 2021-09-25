module.exports.checkError = (error, res) => {
  const errorInput = 400;
  const serverError = 500;
  if (error.name === 'ValidationError') {
    return res.status(errorInput).send({ message: 'Invalid input' });
  }
  if (error.name === 'CastError') {
    return res.status(errorInput).send({ message: 'The info you requested does not exist' });
  }
  return res.status(serverError).send({ message: 'Server is not responding' });
};

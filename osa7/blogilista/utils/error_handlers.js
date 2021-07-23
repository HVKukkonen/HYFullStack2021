const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error('following error occured', error.message);

  if (error.name === 'ValidationError') {
    response.status(400).send('errorHandler: validation error received');
  }

  next(error);
};

module.exports = errorHandler;

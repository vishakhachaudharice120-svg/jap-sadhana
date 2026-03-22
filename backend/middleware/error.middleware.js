const { errorResponse } = require('../helpers/response.helper');

function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  const payload = errorResponse(message, statusCode, err.errors || null);
  // In production you might avoid sending stack traces
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }
  res.status(statusCode).json(payload);
}

module.exports = errorMiddleware;

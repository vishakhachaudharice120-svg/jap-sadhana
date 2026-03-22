function successResponse(data = null, message = 'Success') {
  return {
    success: true,
    message,
    data,
  };
}

function errorResponse(message = 'Something went wrong', statusCode = 500, errors = null) {
  return {
    success: false,
    message,
    statusCode,
    errors,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};

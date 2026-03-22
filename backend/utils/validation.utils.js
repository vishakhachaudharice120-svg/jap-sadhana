const { MANTRAS } = require('../config/constants');

function createValidationError(message, errors = null, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function isValidDateInput(value) {
  return !Number.isNaN(new Date(value).getTime());
}

function isValidMantraId(mantraId) {
  return MANTRAS.some((mantra) => mantra.id === mantraId);
}

module.exports = {
  createValidationError,
  isValidDateInput,
  isValidEmail,
  isValidMantraId,
};

const { createValidationError } = require('./validation.utils');

const REQUIRED_ENV_VARS = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_CALLBACK_URL',
  'FRONTEND_URL',
];

function validateEnv() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length) {
    throw createValidationError(`Missing required environment variables: ${missing.join(', ')}`, missing, 500);
  }
}

module.exports = {
  validateEnv,
};

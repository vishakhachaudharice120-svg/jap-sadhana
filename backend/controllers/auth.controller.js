const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const { signToken } = require('../utils/jwt.utils');
const { successResponse } = require('../helpers/response.helper');
const userRepository = require('../repositories/user.repository');
const { ROLES } = require('../config/constants');
const { createValidationError, isValidEmail } = require('../utils/validation.utils');

async function register(req, res, next) {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!name || name.length < 2) {
      throw createValidationError('Name must be at least 2 characters long.');
    }

    if (!isValidEmail(email)) {
      throw createValidationError('Please provide a valid email address.');
    }

    if (password.length < 6) {
      throw createValidationError('Password must be at least 6 characters long.');
    }

    const existing = await userRepository.findByEmail(email);
    if (existing) {
      throw createValidationError('Email already registered.');
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepository.create({ name, email, password: hashed, role: ROLES.USER });
    const token = signToken({ userId: user._id, role: user.role });
    return res.json(successResponse({ token, user }, 'Registered successfully'));
  } catch (err) {
    return next(err);
  }
}

async function login(req, res, next) {
  const email = String(req.body.email || '').trim().toLowerCase();
  const password = String(req.body.password || '');

  if (!isValidEmail(email)) {
    return next(createValidationError('Please provide a valid email address.'));
  }

  if (!password) {
    return next(createValidationError('Password is required.'));
  }

  req.body.email = email;
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ success: false, message: info?.message || 'Invalid credentials' });
    }
    const token = signToken({ userId: user._id, role: user.role });
    return res.json(successResponse({ token, user }, 'Logged in successfully'));
  })(req, res, next);
}

async function googleCallback(req, res, next) {
  try {
    const user = req.user;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (!user) {
      return res.redirect(`${frontendUrl}/login?error=oauth_failed`);
    }

    const token = signToken({ userId: user._id, role: user.role });
    return res.redirect(`${frontendUrl}/login?token=${token}`);
  } catch (err) {
    return next(err);
  }
}

async function getMe(req, res) {
  return res.json(successResponse({ user: req.user }, 'Current user'));
}

module.exports = {
  register,
  login,
  googleCallback,
  getMe,
};

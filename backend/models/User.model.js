const mongoose = require('mongoose');
const { ROLES } = require('../config/constants');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, default: null },
    googleId: { type: String, default: null },
    avatar: { type: String, default: null },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model('User', userSchema);

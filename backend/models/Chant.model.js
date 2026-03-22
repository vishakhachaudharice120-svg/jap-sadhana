const mongoose = require('mongoose');
const { MANTRAS } = require('../config/constants');
const { normalizeDate } = require('../utils/date.utils');

const ChantSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mantraId: {
      type: String,
      enum: MANTRAS.map((m) => m.id),
      required: true,
    },
    date: { type: Date, required: true },
    count: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

ChantSchema.index({ userId: 1, mantraId: 1, date: 1 }, { unique: true });

ChantSchema.pre('save', function normalizeDatePreSave(next) {
  if (this.isModified('date')) {
    this.date = normalizeDate(this.date);
  }
  next();
});

module.exports = mongoose.model('Chant', ChantSchema);

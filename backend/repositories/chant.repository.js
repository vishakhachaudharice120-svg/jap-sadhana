const BaseRepository = require('./base.repository');
const Chant = require('../models/Chant.model');
const { normalizeDate } = require('../utils/date.utils');

class ChantRepository extends BaseRepository {
  constructor() {
    super(Chant);
  }

  upsertChant({ userId, mantraId, date, count }) {
    const normalizedDate = normalizeDate(date);
    return this.model.findOneAndUpdate(
      { userId, mantraId, date: normalizedDate },
      { $set: { count }, $setOnInsert: { userId, mantraId, date: normalizedDate } },
      { new: true, upsert: true, runValidators: true }
    );
  }

  getByUser(userId) {
    return this.model.find({ userId }).sort({ date: -1 });
  }

  getByDate(userId, date) {
    const normalizedDate = normalizeDate(date);
    return this.model.find({ userId, date: normalizedDate });
  }
}

module.exports = new ChantRepository();

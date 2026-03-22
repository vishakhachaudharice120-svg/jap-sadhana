const { successResponse } = require('../helpers/response.helper');
const chantRepository = require('../repositories/chant.repository');
const { MANTRAS } = require('../config/constants');
const { normalizeDate } = require('../utils/date.utils');
const { createValidationError, isValidMantraId } = require('../utils/validation.utils');

async function summary(req, res, next) {
  try {
    const userId = req.user._id;
    const chants = await chantRepository.getByUser(userId);
    const totals = MANTRAS.reduce((acc, mantra) => {
      acc[mantra.id] = 0;
      return acc;
    }, {});
    chants.forEach((c) => {
      totals[c.mantraId] = (totals[c.mantraId] || 0) + c.count;
    });
    const grandTotal = Object.values(totals).reduce((a, b) => a + b, 0);
    return res.json(successResponse({ totals, grandTotal }, 'Summary fetched'));
  } catch (err) {
    return next(err);
  }
}

async function monthly(req, res, next) {
  try {
    const { mantraId, month, year } = req.query;
    const userId = req.user._id;
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

    if (Number.isNaN(monthInt) || Number.isNaN(yearInt)) {
      throw createValidationError('month and year are required.');
    }

    if (monthInt < 1 || monthInt > 12) {
      throw createValidationError('month must be between 1 and 12.');
    }

    if (yearInt < 2000 || yearInt > 2100) {
      throw createValidationError('year must be between 2000 and 2100.');
    }

    if (mantraId && !isValidMantraId(mantraId)) {
      throw createValidationError('Please provide a valid mantraId.');
    }

    const start = new Date(Date.UTC(yearInt, monthInt - 1, 1));
    const end = new Date(Date.UTC(yearInt, monthInt, 1));
    const filter = { userId, date: { $gte: start, $lt: end } };
    if (mantraId) filter.mantraId = mantraId;

    const chants = await chantRepository.find(filter);
    // Map date -> counts per mantra
    const days = {};
    chants.forEach((c) => {
      const key = normalizeDate(c.date).toISOString().split('T')[0];
      if (!days[key]) days[key] = 0;
      days[key] += c.count;
    });
    const data = Object.entries(days).map(([dateKey, count]) => ({ date: dateKey, count }));
    return res.json(successResponse({ data }, 'Monthly data'));
  } catch (err) {
    return next(err);
  }
}

module.exports = { summary, monthly };

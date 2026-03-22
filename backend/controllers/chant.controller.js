const { successResponse } = require('../helpers/response.helper');
const chantRepository = require('../repositories/chant.repository');
const { normalizeDate } = require('../utils/date.utils');
const { createValidationError, isValidDateInput, isValidMantraId } = require('../utils/validation.utils');

async function addOrUpdate(req, res, next) {
  try {
    const { mantraId, date, count } = req.body;
    const numericCount = Number(count);

    if (!isValidMantraId(mantraId)) {
      throw createValidationError('Please choose a valid mantra.');
    }

    if (!isValidDateInput(date)) {
      throw createValidationError('Please provide a valid chant date.');
    }

    if (!Number.isInteger(numericCount) || numericCount < 0) {
      throw createValidationError('Chant count must be a non-negative whole number.');
    }

    const chant = await chantRepository.upsertChant({
      userId: req.user._id,
      mantraId,
      date: new Date(date),
      count: numericCount,
    });
    return res.json(successResponse({ chant }, 'Chant saved'));
  } catch (err) {
    return next(err);
  }
}

async function getAll(req, res, next) {
  try {
    const chants = await chantRepository.getByUser(req.user._id);
    return res.json(successResponse({ chants }, 'Chants fetched'));
  } catch (err) {
    return next(err);
  }
}

async function getByDate(req, res, next) {
  try {
    if (!isValidDateInput(req.params.date)) {
      throw createValidationError('Please provide a valid date.');
    }

    const date = normalizeDate(req.params.date);
    const chants = await chantRepository.getByDate(req.user._id, date);
    return res.json(successResponse({ chants }, 'Chants for date'));
  } catch (err) {
    return next(err);
  }
}

module.exports = { addOrUpdate, getAll, getByDate };

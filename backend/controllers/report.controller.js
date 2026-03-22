const { successResponse } = require('../helpers/response.helper');
const chantRepository = require('../repositories/chant.repository');
const userRepository = require('../repositories/user.repository');
const { MANTRAS } = require('../config/constants');
const { generateReport } = require('../utils/excel.utils');
const { createValidationError, isValidDateInput } = require('../utils/validation.utils');
const { normalizeDate } = require('../utils/date.utils');

async function download(req, res, next) {
  try {
    const { format = 'excel', from, to } = req.query;

    if (format !== 'excel') {
      throw createValidationError('Only excel report downloads are currently supported.');
    }

    if (from && !isValidDateInput(from)) {
      throw createValidationError('Please provide a valid from date.');
    }

    if (to && !isValidDateInput(to)) {
      throw createValidationError('Please provide a valid to date.');
    }

    if (from && to && new Date(from) > new Date(to)) {
      throw createValidationError('The from date cannot be later than the to date.');
    }

    const users = await userRepository.find();
    const chantFilter = {};

    if (from || to) {
      chantFilter.date = {};

      if (from) {
        chantFilter.date.$gte = normalizeDate(from);
      }

      if (to) {
        const inclusiveEnd = normalizeDate(to);
        inclusiveEnd.setUTCDate(inclusiveEnd.getUTCDate() + 1);
        chantFilter.date.$lt = inclusiveEnd;
      }
    }

    const chants = await chantRepository.find(chantFilter);

    const rows = users.map((user) => {
      const totals = MANTRAS.reduce((acc, mantra) => {
        acc[mantra.id] = 0;
        return acc;
      }, {});

      chants
        .filter((chant) => chant.userId.toString() === user._id.toString())
        .forEach((chant) => {
          totals[chant.mantraId] += chant.count;
        });

      return {
        name: user.name,
        email: user.email,
        ...totals,
      };
    });

    const buffer = await generateReport(rows);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="jap-report.xlsx"');
    return res.send(buffer);
  } catch (err) {
    return next(err);
  }
}

async function summary(req, res, next) {
  try {
    const users = await userRepository.find();
    const chants = await chantRepository.find();
    const totals = MANTRAS.reduce((acc, mantra) => {
      acc[mantra.id] = chants
        .filter((chant) => chant.mantraId === mantra.id)
        .reduce((sum, chant) => sum + chant.count, 0);
      return acc;
    }, {});

    return res.json(successResponse({
      totalUsers: users.length,
      totals,
    }, 'Report summary fetched.'));
  } catch (err) {
    return next(err);
  }
}

module.exports = { download, summary };

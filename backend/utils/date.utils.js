function normalizeDate(dateInput) {
  const date = dateInput ? new Date(dateInput) : new Date();
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

module.exports = { normalizeDate };

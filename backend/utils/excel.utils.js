const ExcelJS = require('exceljs');
const { MANTRAS } = require('../config/constants');

async function generateReport(records) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Jap Report');

  const mantraHeaders = MANTRAS.map((mantra) => ({
    header: mantra.label,
    key: mantra.id,
    width: 22,
  }));

  sheet.columns = [
    { header: 'Name', key: 'name', width: 22 },
    { header: 'Email', key: 'email', width: 28 },
    ...mantraHeaders,
  ];

  records.forEach((row) => {
    sheet.addRow(row);
  });

  const totalsRow = MANTRAS.reduce(
    (acc, mantra, index) => {
      acc[mantra.id] = records.reduce((sum, row) => sum + (Number(row[mantra.id]) || 0), 0);
      if (index === 0) {
        acc.name = 'total';
      }
      return acc;
    },
    { name: 'total', email: records.length },
  );

  const addedTotalsRow = sheet.addRow(totalsRow);
  sheet.getRow(1).font = { bold: true };
  addedTotalsRow.font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  return buffer;
}

module.exports = { generateReport };

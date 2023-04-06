const XLSX = require("xlsx");

class ExcelFileReader {
  constructor(filePath) {
    const workbook = XLSX.readFile(filePath);
    this.worksheets = {};
    workbook.SheetNames.forEach((name) => {
      this.worksheets[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
    });
  }

  getWorksheet(sheetName) {
    return this.worksheets[sheetName];
  }
}

module.exports = function readExcelFile(filePath) {
  const reader = new ExcelFileReader(filePath);
  return reader;
};

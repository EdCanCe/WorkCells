const db = require("../util/database"); // Importar la conexión
const { v4: uuidv4 } = require("uuid");

module.exports = class Holiday {
  constructor(usedTemplateHolidayIDFK, usedDate) {
    this.usedTemplateHolidayIDFK = usedTemplateHolidayIDFK;
    this.usedDate = usedDate;
  }
  save() {
    const usedHolidayID = uuidv4();
    return db.execute(
      "INSERT INTO usedHoliday(usedHolidayID, usedDate, usedTemplateHolidayIDFK) VALUES( ?, ?, ?)",
      [usedHolidayID, this.usedDate, this.usedTemplateHolidayIDFK]
    );
  }

  static fetchAll() {
    return db.execute(`SELECT templateHolidayID, title FROM templateHoliday`);
  }
};

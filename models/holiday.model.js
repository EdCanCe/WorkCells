const db = require("../util/database"); // Importar la conexión
const { v4: uuidv4 } = require("uuid");

module.exports = class Holiday {
  constructor(usedTemplateHolidayID, usedDate) {
    this.usedTemplateHolidayID = usedTemplateHolidayID;
    this.usedDate = usedDate;
  }
  save() {
    const usedHolidayID = uuidv4();
    return db.execute("INSERT INTO usedHoliday(usedHoliday)");
  }
};

const db = require("../util/database"); // Importar la conexión
const { v4: uuidv4 } = require("uuid");

module.exports = class Holiday {
  constructor(usedDate, usedTemplateHolidayIDFK) {
    this.usedDate = usedDate;
    this.usedTemplateHolidayIDFK = usedTemplateHolidayIDFK;
  }
  save() {
    const usedHolidayID = uuidv4();

    const checkDateQuery = `SELECT usedDate, usedTemplateHolidayIDFK FROM usedHoliday WHERE usedDate = ? AND usedTemplateHolidayIDFK = ?`;
    return db
      .execute(checkDateQuery, [this.usedDate, this.usedTemplateHolidayIDFK])
      .then(([rows]) => {
        if (rows.length > 0) {
          throw new Error("El dia feriado que deseas agregar ya fue agregado.");
        }

        const query = `INSERT INTO usedHoliday(usedHolidayID, usedDate, usedTemplateHolidayIDFK) VALUES( ?, ?, ?)`;
        return db.execute(query, [
          usedHolidayID,
          this.usedDate,
          this.usedTemplateHolidayIDFK,
        ]);
      })
      .catch((error) => {
        console.error("Error al guardar el usuario:", error.message);
        throw error;
      });
  }

  static fetchAll() {
    return db.execute(`SELECT templateHolidayID, title FROM templateHoliday`);
  }
};

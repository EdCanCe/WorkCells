const db = require("../util/database"); // Asegúrate de importar tu módulo de conexión

class Holiday {
    static fetchByDateType(startDate, endDate) {
        return db.execute(`SELECT usedDate, title FROM usedHoliday, templateHoliday WHERE usedHoliday.usedTemplateHolidayID = templateHoliday.templateHolidayID AND usedDate BETWEEN ? AND ?;`, [startDate, endDate]
        );
    }
}

module.exports = Holiday;
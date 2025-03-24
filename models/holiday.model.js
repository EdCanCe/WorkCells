const db = require("../util/database"); // Asegúrate de importar tu módulo de conexión

class Holiday {
    static fetchByDateType(startDate, endDate) {
        return db.execute(`SELECT usedDate, title FROM usedHoliday, templateHoliday WHERE usedHoliday.usedTemplateHolidayID = templateHoliday.templateHolidayID AND usedDate BETWEEN ? AND ?;`, [startDate, endDate]
        );
    }
    static fetchAll() {
        return db.execute('SELECT t.title , u.usedDate FROM templateholiday t, usedholiday u WHERE t.templateHolidayID = u.usedTemplateHolidayID;');
    }
};

module.exports = Holiday;
const db = require('../util/database');

module.exports = class Holiday {
    
    // Obtiene un usuario por su email
    static fetchAll() {
        return db.execute('SELECT t.title , u.usedDate FROM templateholiday t, usedholiday u WHERE t.templateHolidayID = u.usedTemplateHolidayID;');
    }
};

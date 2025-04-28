const db = require("../util/database"); // Importar la conexión
const { v4: uuidv4 } = require("uuid");

module.exports = class Template {
    constructor(holidayDate, title) {
        this.holidayDate = holidayDate;
        this.title = title;
    }
    save() {
        const templateHolidayID = uuidv4();

        const checkDateQuery = `SELECT holidayDate, title 
                                FROM templateHoliday 
                                WHERE holidayDate = ?
                                AND title = ?`;
        return db
            .execute(checkDateQuery, [this.holidayDate, this.title])
            .then(([rows]) => {
                if (rows.length > 0) {
                    throw new Error(
                        "El dia feriado que deseas agregar ya fue agregado con anterioridad."
                    );
                }
                const query = `INSERT INTO templateHoliday(templateHolidayID, holidayDate, title) VALUES( ?, ?, ?)`;
                return db.execute(query, [
                    templateHolidayID,
                    this.holidayDate,
                    this.title,
                ]);
            })
            .catch((error) => {
                console.error(
                    "Error al guardar el el dia feriado:",
                    error.message
                );
                throw error;
            });
    }
};

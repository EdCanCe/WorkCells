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
                        "The holiday you wish to add has already been added."
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
                console.error("Error in saving the holiday:", error.message);
                throw error;
            });
    }

    static getTemplateHolidayPaginated(limit, offset) {
        return db.execute(
            `SELECT 
                    title AS nombre, 
                    holidayDate AS fecha,
                    templateHolidayID
                FROM templateHoliday
                ORDER BY holidayDate DESC
                LIMIT ? OFFSET ?;`,
            [limit, offset]
        );
    }

    static fetchOneTemplateHoliday(templateHolidayID) {
        return db.execute(
            `SELECT holidayDate, title, templateHolidayID 
                FROM templateHoliday 
                WHERE templateHolidayID = ?`,
            [templateHolidayID]
        );
    }
};

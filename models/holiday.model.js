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
            .execute(checkDateQuery, [
                this.usedDate,
                this.usedTemplateHolidayIDFK,
            ])
            .then(([rows]) => {
                if (rows.length > 0) {
                    throw new Error(
                        "The holiday you wish to add has already been added this year."
                    );
                }

                const query = `INSERT INTO usedHoliday(usedHolidayID, usedDate, usedTemplateHolidayIDFK) VALUES( ?, ?, ?)`;
                return db.execute(query, [
                    usedHolidayID,
                    this.usedDate,
                    this.usedTemplateHolidayIDFK,
                ]);
            })
            .catch((error) => {
                console.error("Error in saving the holiday:", error.message);
                throw error;
            });
    }

    static fetchAll() {
        return db.execute(`SELECT * FROM templateHoliday`);
    }

    static fetchUsedHoliday() {
        return db.execute(
            `SELECT usedDate, title, usedHolidayID FROM usedHoliday, templateHoliday WHERE usedHoliday.usedTemplateHolidayIDFK = templateHoliday.templateHolidayID`
        );
    }

    static fetchOneUsedHoliday(usedHolidayID) {
        return db.execute(
            `SELECT usedDate, title, usedHolidayID 
            FROM usedHoliday, templateHoliday 
            WHERE usedHoliday.usedTemplateHolidayIDFK = templateHoliday.templateHolidayID
            AND usedHolidayID = ?`,
            [usedHolidayID]
        );
    }

    /**
     * Regresa los días ferioados 2 fechas.
     *
     * @param string startDate  La fecha inicial
     * @param string endDate    La fecha final
     * @returns Los días feriados esas fechas
     */
    static fetchByDateType(startDate, endDate) {
        return db.execute(
            `SELECT usedDate, title FROM usedHoliday, templateHoliday WHERE usedHoliday.usedTemplateHolidayIDFK = templateHoliday.templateHolidayID AND usedDate BETWEEN ? AND ?;`,
            [startDate, endDate]
        );
    }
    static fetchAllUsed() {
        return db.execute(
            "SELECT t.title , u.usedDate FROM templateholiday t, usedholiday u WHERE t.templateHolidayID = u.usedTemplateHolidayID;"
        );
    }

    static getHolidayPaginated(limit, offset) {
        return db.execute(
            `SELECT 
                t.title AS nombre, 
                u.usedDate AS fecha,
                u.usedHolidayID
            FROM templateHoliday t, usedHoliday u
            WHERE u.usedTemplateHolidayIDFK = t.templateHolidayID
            ORDER BY u.usedDate DESC
            LIMIT ? OFFSET ?;`,
            [limit, offset]
        );
    }

    static updateDate(usedHolidayID, newDate) {
        const checkDateQuery = `SELECT usedDate, usedTemplateHolidayIDFK FROM usedHoliday WHERE usedDate = ? AND usedHolidayID != ?`;
        return db
            .execute(checkDateQuery, [newDate, usedHolidayID])
            .then(([rows]) => {
                if (rows.length > 0) {
                    throw new Error(
                        "The date you wish to assign is already occupied by another holiday."
                    );
                }

                // Si no está ocupada, actualizamos la fecha
                const query = `UPDATE usedHoliday SET usedDate = ? WHERE usedHolidayID = ?`;
                return db.execute(query, [newDate, usedHolidayID]);
            })
            .catch((error) => {
                console.error("Error updating the holiday:", error.message);
                throw error;
            });
    }

    static deleteUsedHoliday(usedHolidayID) {
        const query = `DELETE FROM usedHoliday WHERE usedHolidayID = ?`;
        return db.execute(query, [usedHolidayID]);
    }
};

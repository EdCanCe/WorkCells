const { off } = require("process");
const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Absence {
    constructor(startDate, endDate, reason, absenceUserID) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.justified = 2; // 0 -> no justificada | 1 -> justificada | 2 -> pendiente
        this.absenceUserID = absenceUserID;
    }

    save() {
        const absenceID = uuidv4();
        return db
            .execute(
                `INSERT INTO absence(absenceID, startDate, endDate, 
                reason, justified, absenceUserIDFK) VALUES(?,?,?,?,?,?)`,
                [
                    absenceID,
                    this.startDate,
                    this.endDate,
                    this.reason,
                    this.justified,
                    this.absenceUserID,
                ]
            )
            .then(() => absenceID);
    }

    static fetchAll() {
        return db.execute("SELECT * FROM absence ORDER BY startDate DESC");
    }

    static fetchAllWithName() {
        return db.execute(`SELECT a.*, u.birthName, u.surname, r.title
FROM absence as a, user as u, role as r 
WHERE u.userID = a.absenceUserIDFK 
AND r.roleID = u.userRoleIDFK 
AND a.justified = 2
ORDER BY startDate DESC`);
    }

    static fetchAllByID(id) {
        return db.execute(
            `SELECT a.*, am.mediaLink FROM absence AS a LEFT JOIN absenceMedia AS am 
                ON a.absenceID = am.absenceIDFK WHERE a.absenceUserIDFK = ? 
                ORDER BY a.startDate DESC`,
            [id]
        );
    }

    static fetchOne(id) {
        return db.execute("SELECT * FROM absence WHERE absenceID = ?", [id]);
    }

    static fetch(id) {
        if (id) {
            return this.fetchOne(id);
        } else {
            return this.fetchAll();
        }
    }

    static getID(email) {
        return db.execute(`SELECT userID FROM user WHERE mail = ?`, [email]);
    }

    static fetchByDateType(startDate, endDate, userID) {
        return db.execute(
            `(SELECT * FROM absence WHERE startDate BETWEEN ? AND ? AND absenceUserIDFK = ?)
    UNION
    (SELECT * FROM absence WHERE startDate BETWEEN ? AND ? AND absenceUserIDFK = ?)`,
            [startDate, endDate, userID, startDate, endDate, userID]
        );
    }

    static updateStatus(absenceId, status) {
        return db.execute(
            "UPDATE absence SET justified = ? WHERE absenceID = ?",
            [status, absenceId]
        );
    }

    static fetchPaginated(limit, offset) {
        return db.execute(
            `SELECT a.*, u.birthName, u.surname, r.title
        FROM absence AS a
        JOIN user AS u ON u.userID = a.absenceUserIDFK
        JOIN role AS r ON r.roleID = u.userRoleIDFK
        WHERE a.justified = 2
        ORDER BY a.startDate DESC
        LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    }

    static getPagination(limit, offset, id) {
        return db.execute(
            `SELECT a.*, am.mediaLink 
                FROM absence AS a 
                LEFT JOIN absenceMedia AS am 
                ON a.absenceID = am.absenceIDFK 
                WHERE a.absenceUserIDFK = ? 
                ORDER BY a.startDate DESC 
                LIMIT ? OFFSET ?`,
            [id, limit, offset]
        );
    }
};

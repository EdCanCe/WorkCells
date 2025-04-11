const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Absence {
    constructor(startDate, endDate, reason, absenceUserID) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.leaderStatus = 2; // 0 -> no justificada | 1 -> justificada | 2 -> pendiente
        this.hrStatus = 2; // 0 -> no justificada | 1 -> justificada | 2 -> pendiente
        this.absenceUserID = absenceUserID;
    }

    save() {
        const absenceID = uuidv4();
        return db
            .execute(
                `INSERT INTO absence(absenceID, startDate, endDate, 
                reason, leaderStatus, hrStatus, absenceUserIDFK) VALUES(?,?,?,?,?,?,?)`,
                [
                    absenceID,
                    this.startDate,
                    this.endDate,
                    this.reason,
                    this.leaderStatus,
                    this.hrStatus,
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

    // Función repetida, eliminar esta función y usar la siguiente
    static fetchOne(id) {
        return db.execute("SELECT * FROM absence WHERE absenceID = ?", [id]);
    }

    static fetchOne(absenceID) {
        return db.execute(
            `SELECT *
        FROM absence a
        WHERE a.absenceID = ?`,
            [absenceID]
        );
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

    /**
     * Regresa las ausencias entre 2 fechas para un usuario.
     *
     * @param string startDate  La fecha inicial
     * @param string endDate    La fecha final
     * @param string userID     El usuario al que le pertenecen las ausencias
     * @returns Las ausencias en esas fechass
     */
    static fetchByDateType(startDate, endDate, userID) {
        return db.execute(
            `(SELECT * FROM absence WHERE startDate BETWEEN ? AND ? AND absenceUserIDFK = ?) UNION (SELECT * FROM absence WHERE endDate BETWEEN ? AND ? AND absenceUserIDFK = ?)`,
            [startDate, endDate, userID, startDate, endDate, userID]
        );
    }

    static updateStatusLeader(absenceId, status) {
        return db.execute(
            "UPDATE absence SET leaderStatus = ? WHERE absenceID = ?",
            [status, absenceId]
        );
    }

    static updateStatusHR(absenceId, status) {
        return db.execute(
            "UPDATE absence SET hrStatus = ? WHERE absenceID = ?",
            [status, absenceId]
        );
    }

    static fetchPaginated(limit, offset, userRole, userId) {
        if (userRole === "Human Resources") {
            // RRHH: Ver todas las solicitudes pendientes para RRHH (justified = 2)
            return db.execute(
                `SELECT a.*, u.birthName, u.surname, r.title
                FROM absence AS a
                JOIN user AS u ON u.userID = a.absenceUserIDFK
                JOIN role AS r ON r.roleID = u.userRoleIDFK
                WHERE a.hrStatus = 2
                ORDER BY a.startDate DESC
                LIMIT ? OFFSET ?`,
                [limit, offset]
            );
        } else if (userRole === "Department Leader") {
            // Líder: Ver solo solicitudes pendientes de su departamento
            return db.execute(
                `SELECT a.*, u.birthName, u.surname, r.title
                FROM absence AS a
                JOIN user AS u ON u.userID = a.absenceUserIDFK
                JOIN role AS r ON r.roleID = u.userRoleIDFK
                JOIN user AS leader ON leader.userID = ?
                WHERE a.leaderStatus = 2
                AND u.prioritaryDepartmentIDFK = leader.prioritaryDepartmentIDFK
                ORDER BY a.startDate DESC
                LIMIT ? OFFSET ?`,
                [userId, limit, offset]
            );
        } else {
            // Para otros roles, retornar un array vacío
            return Promise.resolve([[]]);
        }
    }

    static fetchAllPaginated(limit, offset, userRole, userId) {
        if (userRole === "Human Resources") {
            // RRHH: Ver todas las solicitudes aprobadas o rechazadas (justified = 0 o 1)
            return db.execute(
                `SELECT a.*, u.birthName, u.surname, r.title
                FROM absence AS a
                JOIN user AS u ON u.userID = a.absenceUserIDFK
                JOIN role AS r ON r.roleID = u.userRoleIDFK
                WHERE (a.hrStatus = 0 OR a.hrStatus = 1)
                ORDER BY a.startDate DESC
                LIMIT ? OFFSET ?`,
                [limit, offset]
            );
        } else if (userRole === "Department Leader") {
            // Líder: Ver solicitudes aprobadas o rechazadas de su departamento
            return db.execute(
                `SELECT a.*, u.birthName, u.surname, r.title
                FROM absence AS a
                JOIN user AS u ON u.userID = a.absenceUserIDFK
                JOIN role AS r ON r.roleID = u.userRoleIDFK
                JOIN user AS leader ON leader.userID = ?
                WHERE (a.leaderStatus = 0 OR a.leaderStatus = 1)
                AND u.prioritaryDepartmentIDFK = leader.prioritaryDepartmentIDFK
                ORDER BY a.startDate DESC
                LIMIT ? OFFSET ?`,
                [userId, limit, offset]
            );
            // Posible nueva implementación:
            // SELECT u.*
            // FROM user AS u
            // JOIN (
            //     SELECT prioritaryDepartmentIDFK
            //     FROM user
            //     WHERE userID = '2836ef6d-af85-44c1-8f6f-ed131015d8d2'
            // ) AS leader
            // ON u.prioritaryDepartmentIDFK = leader.prioritaryDepartmentIDFK
            // ORDER BY u.;
        } else {
            // Para otros roles, retornar un array vacío
            return Promise.resolve([[]]);
        }
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

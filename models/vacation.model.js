const db = require("../util/database"); // Asegúrate de importar tu módulo de conexión

class Vacation {
    constructor(userID, startDate, endDate, reason) {
        this.userID = userID;
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
    }

    save() {
        const saveQuery =
            "INSERT INTO vacation(vacationID, vacationUserIDFK, startDate, endDate, reason) VALUES (UUID(), ? , ? , ? , ? )";
        return db
            .execute(saveQuery, [
                this.userID,
                this.startDate,
                this.endDate,
                this.reason,
            ])
            .catch((error) => {
                console.error("Error al añadir vacación:", error.message);
                throw error;
            });
    }

    static fetchAll(userID) {
        return db.execute(
            `SELECT 
  u.mail, 
  v.reason, 
  v.startDate, 
  v.endDate, 
  v.leaderStatus
FROM vacation v, user u
WHERE v.vacationUserIDFK = u.userID
AND u.userID IN (
  -- Subconsulta: Usuarios del mismo departamento del líder
  SELECT ud.userIDFK
  FROM userDepartment ud
  WHERE ud.departmentIDFK IN (
    -- Subconsulta: Departamento del líder
    SELECT departmentIDFK
    FROM userDepartment, user
    WHERE userIDFK = ?
    
  )
);`,
            [userID]
        );
    }

    static fetchAllSuperAdmin() {
        return db.execute(
            `SELECT 
                u.birthname,
                u.surname, 
                v.reason, 
                v.startDate, 
                v.endDate, 
                v.leaderStatus,
                v.hrStatus,
                v.vacationID,
                u.birthName,
                u.surname
            FROM vacation v, user u;`
        );
    }

    static updateVacation(vacationId, startDate, endDate, reason) {
        console.log("Ejecutando UPDATE con:", vacationId, startDate, endDate, reason); // Agregar log
    
        return db.execute(
            `UPDATE vacation
             SET startDate = ?, endDate = ?, reason = ?
             WHERE vacationID = ?;`,
            [startDate, endDate, reason, vacationId]
        );
    }
    

    static fetchAllWithNames(userID) {
        return db.execute(
            `SELECT 
                u.birthName, 
                u.surname,
                u.mail, 
                v.reason, 
                v.startDate, 
                v.endDate, 
                v.leaderStatus,
                v.hrStatus,
                v.vacationID
            FROM vacation v, user u
            WHERE v.vacationUserIDFK = u.userID 
            AND u.userID IN (
                SELECT ud.userIDFK
                FROM userDepartment ud
                WHERE ud.departmentIDFK IN (
                    SELECT departmentIDFK
                    FROM userDepartment, user
                    WHERE userIDFK = ?
                )
            );`,
            [userID]
        );
    }
    
    static fetchPaginated(limit, offset, userRole, userId) {
        if (userRole === "Human Resources") {
            // RRHH: Ver todas las solicitudes pendientes para RRHH (hrStatus = 2), sin importar el estado del líder
            return db.execute(
                `SELECT v.*, u.birthName, u.surname 
                 FROM vacation AS v
                 JOIN user AS u ON u.userID = v.vacationUserIDFK
                 WHERE v.hrStatus = 2
                 ORDER BY v.startDate DESC
                 LIMIT ? OFFSET ?`,
                [limit, offset]
            );
        } else if (userRole === "Leader") {
            // Líder: Ver solo solicitudes pendientes de su departamento
            return db.execute(
                `SELECT v.*, u.birthName, u.surname 
                 FROM vacation AS v
                 JOIN user AS u ON u.userID = v.vacationUserIDFK
                 WHERE v.leaderStatus = 2
                 AND u.userID IN (
                    SELECT ud.userIDFK
                    FROM userDepartment ud
                    WHERE ud.departmentIDFK IN (
                        SELECT departmentIDFK
                        FROM userDepartment
                        WHERE userIDFK = ?
                    )
                 )
                 ORDER BY v.startDate DESC
                 LIMIT ? OFFSET ?`,
                [userId, limit, offset]
            );
        } else {
            // Para otros roles, retornar un array vacío
            return Promise.resolve([[]]);
        }
    }
    
    static fetchDepartmentPaginated(leaderID, limit, offset) {
        return db.execute(
            `SELECT v.*, u.birthName, u.surname 
             FROM vacation AS v
             JOIN user AS u ON u.userID = v.vacationUserIDFK
             WHERE v.leaderStatus = 2 AND v.hrStatus = 2
             AND u.userID IN (
                SELECT ud.userIDFK
                FROM userDepartment ud
                WHERE ud.departmentIDFK IN (
                    SELECT departmentIDFK
                    FROM userDepartment
                    WHERE userIDFK = ?
                )
             )
             ORDER BY v.startDate DESC
             LIMIT ? OFFSET ?`,
            [leaderID, limit, offset]
        );
    }

    static fetchOneVacation(vacationID) {
        return db.execute(
            `SELECT v.vacationID, v.reason, v.startDate, v.endDate, v.leaderStatus, v.hrStatus
         FROM vacation v
         WHERE v.vacationID = ?`,
            [vacationID]
        );
    }

    static fetchAllVacation(userID) {
        return db.execute(
            `SELECT v.vacationID,v.reason,v.startDate, v.endDate,
            v.leaderStatus, v.hrStatus 
            FROM vacation v
            WHERE vacationUserIDFK = ?`,
            [userID]
        );
    }

    static updateStatusLeader(vacationId, status) {
        return db.execute(
            "UPDATE vacation SET leaderStatus = ? WHERE vacationID = ?",
            [status, vacationId]
        );
    }

    static updateStatusHR(vacationId, status) {
        return db.execute(
            "UPDATE vacation SET hrStatus = ? WHERE vacationID = ?",
            [status, vacationId]
        );
    }

    static fetchByDateType(startDate, endDate, userID) {
        return db.execute(
            `(SELECT * FROM vacation WHERE startDate BETWEEN ? AND ? AND vacationUserIDFK = ?)
UNION
(SELECT * FROM vacation WHERE endDate BETWEEN ? AND ? AND vacationUserIDFK = ?)`,
            [startDate, endDate, userID, startDate, endDate, userID]
        );
    }
}

module.exports = Vacation;
const db = require("../util/database"); // Asegúrate de importar tu módulo de conexión

class Vacation {

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
);`, [userID]
    );
  }

  static fetchByDateType(startDate, endDate, userID) {
    return db.execute(`(SELECT * FROM vacation WHERE startDate BETWEEN ? AND ? AND vacationUserIDFK = ?)
UNION
(SELECT * FROM vacation WHERE endDate BETWEEN ? AND ? AND vacationUserIDFK = ?)`, [startDate, endDate, userID, startDate, endDate, userID]
    );
  }
}

module.exports = Vacation;
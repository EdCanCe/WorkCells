const db = require("../util/database"); // Asegúrate de importar tu módulo de conexión

class Absence {
  static fetchByDateType(startDate, endDate, userID) {
    return db.execute(`(SELECT * FROM absence WHERE startDate BETWEEN ? AND ? AND absenceUserIDFK = ?)
UNION
(SELECT * FROM absence WHERE startDate BETWEEN ? AND ? AND absenceUserIDFK = ?)`, [startDate, endDate, userID, startDate, endDate, userID]
    );
  }
}

module.exports = Absence;
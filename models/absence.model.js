const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Absence {
  constructor(startDate, endDate, reason, absenceUserID) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.reason = reason;
    this.justified = 0; // 0 -> no justificada | 1 -> justificada
    this.absenceUserID = absenceUserID;
  }

  save() {
    const absenceID = uuidv4();
    return db.execute(
      `INSERT INTO absence(absenceID, startDate, endDate, 
                reason, justified, absenceUserIDFK) VALUES(?,?,?,?,?,?)`,
      [
        absenceID,
        this.startDate,
        this.endDate,
        this.reason,
        0,
        this.absenceUserID,
      ]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM absence ORDER BY startDate DESC LIMIT 10");
  }

  static fetchAllByID(id) {
    return db.execute("SELECT * FROM absence WHERE absenceUserIDFK = ?", [id]);
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
};

const db = require("../util/database"); // Asegúrate de importar tu módulo de conexión

class Vacation {
  static fetchAll(userID) {
    return db.execute(
      "SELECT * FROM vacation"
    );
  }
}

module.exports = Vacation;

const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");
class Fault {
    constructor({ reason = '', doneDate = '', email = '', faultID = '', userID = '' }) {
        this.reason = reason;
        this.doneDate = doneDate;
        this.email = email;
        this.faultID = faultID;
        this.userID = userID;
    }


  save() {
    const faultID = uuidv4();
    const checkEmailQuery = `SELECT userID FROM user WHERE mail = ?`;
    return db
      .execute(checkEmailQuery, [this.email])
      .then(([rows, fieldData]) => {
        if (rows.length === 0) {
          throw new Error("El email no está registrado");
        }
        const query = `
          INSERT INTO fault (faultID, summary, doneDate, faultUserIDFK) 
          VALUES (?, ?, ?, ?)
        `;
        return db
          .execute(query, [
            faultID,
            this.reason,
            this.doneDate,
            rows[0].userID,
          ])
          .then(() => faultID);
      });
  }

    delete() {

        console.log("User delete: ", this.userID);
        console.log("Fault delete: ", this.faultID);

        return db.execute(`SELECT faultID FROM fault WHERE faultID = ? AND faultUserIDFK = ?`, [this.faultID, this.userID])
            .then(([rows]) => {
                if (rows.length === 0) {
                    throw new Error('There are no faults with this ID and user');
                }
                return db.execute(`DELETE FROM faultMedia WHERE faultIDFK = ?`, [this.faultID])
                    .then(() => {
                        return db.execute(`DELETE FROM fault WHERE faultID = ? AND faultUserIDFK = ?`, [this.faultID, this.userID]);
                    });
            });
    }

    static fetchAll() {
        return db.execute(
            `SELECT u.birthName AS nombre, u.mail AS correo, 
      f.doneDate AS fecha_falta, COUNT(f.faultUserIDFK) 
      AS num_faltas 
      FROM  user u, fault f 
      WHERE u.userId = f.faultUserIDFK 
      GROUP BY  u.userId 
      ORDER BY num_faltas desc 
      limit 10;`
        );
    }

  // Método para obtener faltas paginadas (sin búsqueda)
  static getFaltasPaginated(limit, offset) {
    return db.execute(
      `SELECT 
          u.birthName AS nombre, 
          u.mail AS correo, 
          MAX(f.doneDate) AS fecha_falta, 
          COUNT(f.faultUserIDFK) AS num_faltas
       FROM user u
       JOIN fault f ON u.userId = f.faultUserIDFK
       WHERE u.mail IS NOT NULL
       GROUP BY u.userId
       ORDER BY num_faltas DESC
       LIMIT ? OFFSET ?;`,
      [limit, offset]
    );
  }

  // Nuevo método para búsqueda por query (por ejemplo, buscando por nombre o email)
  static searchByQuery(query, limit, offset) {
    return db.execute(
      `SELECT 
          u.birthName AS nombre, 
          u.mail AS correo, 
          MAX(f.doneDate) AS fecha_falta, 
          COUNT(f.faultUserIDFK) AS num_faltas
       FROM user u
       JOIN fault f ON u.userId = f.faultUserIDFK
       WHERE (u.birthName LIKE ? OR u.mail LIKE ?)
       GROUP BY u.userId
       ORDER BY num_faltas DESC
       LIMIT ? OFFSET ?;`,
      [`%${query}%`, `%${query}%`, limit, offset]
    );
  }
}

module.exports = Fault;

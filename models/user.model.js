const db = require('../util/database');

module.exports = class Usuario {

    // Obtiene un usuario por su email
    static fetchOne(email) {
        return db.execute('SELECT passwd, userID FROM user WHERE mail = ?', [email]);
    }

    // Obtiene el periodo del usuario (la fecha en que llegó a la empresa)
    static fetchStartDate(userID) {
        return db.execute(
            `SELECT DAY(workStatus.startDate) as 'day', MONTH(workStatus.startDate) as 'month'
            FROM user, workStatus
            WHERE workStatus.userStatusIDFK = user.userID
            AND user.userID = ?
            ORDER BY workStatus.startDate DESC
            LIMIT 1;`, [userID]);
    }
};

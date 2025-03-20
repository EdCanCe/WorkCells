const db = require('../util/database'); // Asegúrate de importar tu módulo de conexión

class Fault {
    constructor(reason, doneDate, email) {
        this.reason = reason;
        this.doneDate = doneDate;
        this.email = email;
    }

    save() {
        const query = `
            INSERT INTO faults (reason, doneDate, faultUserIDFK) 
            VALUES (?, ?, (SELECT userID FROM user WHERE email = ?))
        `;
        return db.execute(query, [this.reason, this.doneDate, this.email]);
    }
}

module.exports = Fault;

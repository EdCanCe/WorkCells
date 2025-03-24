const db = require('../util/database');

module.exports = class Usuario {
    
    // Obtiene un usuario por su email
    static fetchOne(email) {
        return db.execute('SELECT passwd, userID FROM user WHERE mail = ?', [email]);
    }
};

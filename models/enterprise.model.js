const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Enterprise {

    /**
     * Constructor para crear una empresa
     * 
     * @param string title  El título de la empresa.
     */
    constructor (title) {
        this.id = uuidv4();
        this.title = title;
    }

    /**
     * Crea una empresa nueva en la base de datos.
     * 
     * @returns El id de la nueva empresa.
     */
    save() {
        return db.execute('INSERT INTO enterprise(enterpriseID, title) VALUES(?, ?)', [this.id, this.title])
            .then(() => {
                return this.id;
            });
    }

    /**
     * Obtiene todas las empresas
     * 
     * @returns Los datos de las empresas
     */
    static fetchAll() {
        return db.execute('SELECT * FROM enterprise');
    }

    /**
     * Obtiene los datos de una empresa a partir del nombre
     * 
     * @param string enterprise 
     * @returns Los datos de la empresa
     */
    static fetchByName(enterprise) {
        return db.execute('SELECT * FROM enterprise WHERE title = ?', [enterprise]);
    } 
}
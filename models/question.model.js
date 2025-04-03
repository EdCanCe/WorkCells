const db = require("../util/database");
module.exports = class Question {

	/**
	 * Obtiene todas las preguntas de la base de datos.
	 * 
	 * @returns Los datos de las preguntas.
	 */
	static fetchAll() {
		return db.execute(`SELECT * FROM oneOnOneQuestion`);
	}

};

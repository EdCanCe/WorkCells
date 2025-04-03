const db = require("../util/database");
module.exports = class Measurable {

	/**
	 * Obtiene todas las preguntas de métrica de la base de datos.
	 * 
	 * @returns Los datos de las métricas
	 */
	static fetchAll() {
		return db.execute(`SELECT * FROM oneOnOneMeasurable`);
	}

};

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

	/**
		 * Obtiene las métricas de una sesión One On One.
		 * 
		 * @param string sessionID	La sesión de One On One.
		 * @returns	Las preguntas y métricas de la sesión.
		 */
		static fetchBySessionData(sessionID) {
			return db.execute(
				`SELECT ms.summary, m.evaluation FROM oneOnOneMeasurable ms, oneOnOneMeasure m WHERE m.measureOneOnOneIDFK = ? AND m.measurableIDFK = ms.measurableID;`,
				[sessionID]
			);
		}

};

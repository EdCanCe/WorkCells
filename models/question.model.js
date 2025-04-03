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

	/**
	 * Obtiene las respuestas de una sesión One On One.
	 * 
	 * @param string sessionID	La sesión de One On One.
	 * @returns	Las preguntas y respuestas de la sesión.
	 */
	static fetchBySessionData(sessionID) {
		return db.execute(
			`SELECT q.question, a.answer FROM oneOnOneQuestion q, oneOnOneAnswer a WHERE a.answerOneOnOneIDFK = ? AND a.questionIDFK = q.questionID;`,
			[sessionID]
		);
	}

};

const db = require("../util/database");
module.exports = class Answer {

    /**
     * Constructor de una respuesta ante una pregunta hacia una sesión
     * One On One.
     * 
     * @param string answer         El texto de la respuesta 
     * @param string oneOnOneID     El id de la sesión One On One
     * @param string questionID     El id de la pregunta
     */
    constructor(answer, oneOnOneID, questionID) {
        this.answer = answer;
        this.oneOnOneID = oneOnOneID;
        this.questionID = questionID;
    }

    /**
     * Guarda la respuesta en la base de datos.
     */
    save() {
        db.execute(
            `INSERT INTO oneOnOneAnswer VALUES ( ? , ? , ? )`,
            [this.answer, this.oneOnOneID, this.questionID]
        );
    }

};

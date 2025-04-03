const db = require("../util/database");
module.exports = class Measure {

    /**
     * Constructor de una medición ante una métrica hacia una sesión
     * One On One.
     * 
     * @param int answer            El valor de la respuesta 
     * @param string oneOnOneID     El id de la sesión One On One
     * @param string measurableID   El id de la métrica
     */
    constructor(evaluation, oneOnOneID, measurableID) {
        this.evaluation = evaluation;
        this.oneOnOneID = oneOnOneID;
        this.measurableID = measurableID;
    }

    /**
     * Guarda la medición en la base de datos.
     */
    save() {
        db.execute(
            `INSERT INTO oneOnOneMeasure VALUES ( ? , ? , ? )`,
            [this.evaluation, this.oneOnOneID, this.measurableID]
        );
    }

};

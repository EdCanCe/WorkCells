const db = require("../util/database");
module.exports = class Measure {

    constructor (evaluation, oneOnOneID, measurableID) {
        this.evaluation = evaluation;
        this.oneOnOneID = oneOnOneID;
        this.measurableID = measurableID;
    }

    save() {
        db.execute(`INSERT INTO oneOnOneMeasure VALUES ( ? , ? , ? )`, [this.evaluation, this.oneOnOneID, this.measurableID]);
    }

};

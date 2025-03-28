const db = require("../util/database");
module.exports = class Answer {

    constructor (answer, oneOnOneID, questionID) {
        this.answer = answer;
        this.oneOnOneID = oneOnOneID;
        this.questionID = questionID;
    }

    save() {
        db.execute(`INSERT INTO oneOnOneAnswer VALUES ( ? , ? , ? )`, [this.answer, this.oneOnOneID, this.questionID]);
    }

};

const db = require("../util/database");
module.exports = class Question {

	static fetchAll() {
		return db.execute(
		`SELECT * FROM oneOnOneQuestion`
		);
	}

};

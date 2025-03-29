const db = require("../util/database");
module.exports = class Measurable {

	static fetchAll() {
		return db.execute(
			`SELECT * FROM oneOnOneMeasurable`
		);
	}

};

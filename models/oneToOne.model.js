const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class OneToOne {
	constructor(expectedTime, meetingDate, meetingLink, oneOnOneUserIDFK) {
		this.expectedTime = expectedTime;
		this.meetingDate = meetingDate;
		this.meetingLink = meetingLink
		this.oneOnOneUserIDFK = oneOnOneUserIDFK;
	}

	save() {
		const oneToOneID = uuidv4();
		return db.execute(
		`INSERT INTO oneOnOne(oneOnOneID, expectedTime, 
				meetingDate, meetingLink, oneOnOneUserIDFK) VALUES (?,?,?,?,?)`,
		[oneToOneID, this.expectedTime, this.meetingDate, this.meetingLink, 
			this.oneOnOneUserIDFK]
		);
	}

	static fetchAll() {
		return db.execute(
		`SELECT * FROM oneOnONE ORDER BY meetingDate DESC LIMIT 10`
		);
	}

	static getID(email) {
		return db.execute(`SELECT userID FROM user WHERE mail = ?`, [email]);
	}

	static fetchByDateType(startDate, endDate, userID) {
		return db.execute(
		"SELECT * FROM oneOnOne WHERE meetingDate BETWEEN ? AND ? AND oneOnOneUserIDFK = ?",
		[startDate, endDate, userID]
		);
	}
};

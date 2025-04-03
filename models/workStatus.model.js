const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class WorkStatus {
    constructor(startDate, endDate, userStatusIDFK) {
        this.startDate = startDate;
        this.endDate = endDate || null;
        this.userStatusIDFK = userStatusIDFK;
    }
    save() {
        const workStatusID = uuidv4();
        return db.execute(
            `INSERT INTO workStatus(workStatusID, startDate, endDate, userStatusIDFK) VALUES(?, ?, ?, ?)`,
            [workStatusID, this.startDate, this.endDate, this.userStatusIDFK]
        );
    }
};

const db = require("../util/database");

module.exports = class Report {
    static getActiveIDs(start, end) {
        return db.execute(
            `SELECT userID FROM user u, workStatus w WHERE u.userID = w.userStatusIDFK AND u.workStatus AND w.startDate BETWEEN ? AND ?`,
            [start, end]
        );
    }

    static getInfoActives(ids) {
        return db.execute(
            `SELECT * FROM user u, userDepartment ud, department d WHERE u.userID = ud.userIDFK AND ud.departmentIDFK = d.departmentID AND u.userID IN (?) ORDER BY d.title`,
            [ids]
        );
    }
};

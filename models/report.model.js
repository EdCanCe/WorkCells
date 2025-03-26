const db = require("../util/database");

module.exports = class Report {
    static getInfoActives(start, end) {
        return db.execute(
            `SELECT u.*, d.title 
                FROM user u, userDepartment ud, department d 
                WHERE u.userID = ud.userIDFK 
                AND ud.departmentIDFK = d.departmentID 
                AND u.userID IN(SELECT userID 
                                FROM user u, workStatus w 
                                WHERE u.userID = w.userStatusIDFK 
                                AND u.workStatus = 1 
                                AND w.startDate BETWEEN ? AND ?) 
                ORDER BY d.title`,
            [start, end]
        );
    }

    static getAllDepartments() {
        return db.execute(
            "SELECT DISTINCT title FROM department ORDER BY title"
        );
    }

    static getInfoInactives(start, end) {
        return db.execute(
            `SELECT u.*, d.title 
            FROM user u, userDepartment ud, department d 
            WHERE u.userID = ud.userIDFK 
            AND ud.departmentIDFK = d.departmentID 
            AND u.userID IN(SELECT userID 
                            FROM user u, workStatus w 
                            WHERE u.userID = w.userStatusIDFK 
                            AND u.workStatus = 0 
                            AND w.endDate BETWEEN ? AND ?) 
            ORDER BY d.title`,
            [start, end]
        );
    }
};

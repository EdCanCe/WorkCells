const db = require("../util/database");

module.exports = class Report {
    static getInfoActives(start, end) {
        return db.execute(
            `SELECT u.curp, u.birthName, u.surname, c.title as country, 
                r.title as role, d.title, u.workModality
            FROM user u 
            JOIN workStatus w 
                ON u.userID = w.userStatusIDFK 
            JOIN department d
                ON u.prioritaryDepartmentIDFK = d.departmentID
            JOIN role r
                ON u.userRoleIDFK = r.roleID
            JOIN country c 
                ON u.countryUserIDFK = c.countryID
            WHERE u.workStatus = 1 AND 
                w.startDate BETWEEN ? AND ? 
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
            `SELECT u.curp, u.birthName, u.surname, c.title as country, 
                r.title as role, d.title, u.workModality
            FROM user u 
            JOIN workStatus w 
                ON u.userID = w.userStatusIDFK 
            JOIN department d
                ON u.prioritaryDepartmentIDFK = d.departmentID
            JOIN role r
                ON u.userRoleIDFK = r.roleID
            JOIN country c 
                ON u.countryUserIDFK = c.countryID
            WHERE u.workStatus = 0 AND 
                w.endDate BETWEEN ? AND ? 
            ORDER BY d.title`,
            [start, end]
        );
    }

    static getActivesPerMonth(start, end) {
        return db.execute(
            `SELECT YEAR(w.startDate) AS anio, MONTH(w.startDate) AS mes, 
            COUNT(DISTINCT u.userID) AS totalEmpleados FROM user u 
            JOIN workStatus w ON u.userID = w.userStatusIDFK WHERE u.workStatus = 1 
            AND w.startDate BETWEEN ? AND ?
            GROUP BY anio, mes
            ORDER BY anio, mes`,
            [start, end]
        );
    }

    static getInactivesPerMonth(start, end) {
        return db.execute(
            `SELECT YEAR(w.endDate) AS anio, MONTH(w.endDate) AS mes, 
            COUNT(DISTINCT u.userID) AS totalEmpleados FROM user u 
            JOIN workStatus w ON u.userID = w.userStatusIDFK WHERE u.workStatus = 0
            AND w.endDate BETWEEN ? AND ?
            GROUP BY anio, mes
            ORDER BY anio, mes`,
            [start, end]
        );
    }
};

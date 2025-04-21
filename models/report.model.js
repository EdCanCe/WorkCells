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

    static fetchDepartment() {
        return db.execute(`SELECT d.departmentID, d.title AS departmentTitle, e.title AS enterpriseTitle 
                            FROM department d, enterprise e 
                            WHERE d.enterpriseIDFK = e.enterpriseID;`);
    }

    static getAnswerWorkload(department) {
        return db.execute(
            `SELECT m.evaluation, o.summary, d.title AS 'Departamento', e.title AS 'Empresa', l.birthName
            FROM oneOnOneMeasure m, oneOnOneMeasurable o, oneOnOne n, user u, department d, enterprise e, user l
            WHERE m.measurableIDFK = o.measurableID 
            AND m.measureOneOnOneIDFK = n.oneOnOneID
            AND n.oneOnOneUserIDFK = u.userID
            AND u.prioritaryDepartmentIDFK = d.departmentID
            AND d.enterpriseIDFK = e.enterpriseID
            AND d.departmentLeaderIDFK = l.userID
            AND m.measurableIDFK = '15125ff3-f1c8-4260-872a-fdea4e7592a5'
            AND d.departmentID = ?
            ORDER BY e.title;`,
            [department]
        );
    }

    static getAnswerPhysicalHealth(department) {
        return db.execute(
            `SELECT m.evaluation, o.summary, d.title AS 'Departamento', e.title AS 'Empresa', l.birthName
            FROM oneOnOneMeasure m, oneOnOneMeasurable o, oneOnOne n, user u, department d, enterprise e, user l
            WHERE m.measurableIDFK = o.measurableID 
            AND m.measureOneOnOneIDFK = n.oneOnOneID
            AND n.oneOnOneUserIDFK = u.userID
            AND u.prioritaryDepartmentIDFK = d.departmentID
            AND d.enterpriseIDFK = e.enterpriseID
            AND d.departmentLeaderIDFK = l.userID
            AND m.measurableIDFK = '5bb474dc-76c5-4561-84a6-5ef52c440a3e'
            AND d.departmentID = ?
            ORDER BY e.title;`,
            [department]
        );
    }

    static getAnswerAcknowledgement(department) {
        return db.execute(
            `SELECT m.evaluation, o.summary, d.title AS 'Departamento', e.title AS 'Empresa', l.birthName
            FROM oneOnOneMeasure m, oneOnOneMeasurable o, oneOnOne n, user u, department d, enterprise e, user l
            WHERE m.measurableIDFK = o.measurableID 
            AND m.measureOneOnOneIDFK = n.oneOnOneID
            AND n.oneOnOneUserIDFK = u.userID
            AND u.prioritaryDepartmentIDFK = d.departmentID
            AND d.enterpriseIDFK = e.enterpriseID
            AND d.departmentLeaderIDFK = l.userID
            AND m.measurableIDFK = 'ea9d0fd3-2bed-4b2e-9de8-1e297982d080'
            AND d.departmentID = ?
            ORDER BY e.title;`,
            [department]
        );
    }

    static getAnswerWorkLifeBalance(department) {
        return db.execute(
            `SELECT m.evaluation, o.summary, d.title AS 'Departamento', e.title AS 'Empresa', l.birthName
            FROM oneOnOneMeasure m, oneOnOneMeasurable o, oneOnOne n, user u, department d, enterprise e, user l
            WHERE m.measurableIDFK = o.measurableID 
            AND m.measureOneOnOneIDFK = n.oneOnOneID
            AND n.oneOnOneUserIDFK = u.userID
            AND u.prioritaryDepartmentIDFK = d.departmentID
            AND d.enterpriseIDFK = e.enterpriseID
            AND d.departmentLeaderIDFK = l.userID
            AND m.measurableIDFK = 'fd306cbf-90f3-498d-9e37-0370ddf0cb91'
            AND d.departmentID = ?
            ORDER BY e.title;`,
            [department]
        );
    }
};

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
            AND MONTH(DATE_ADD(NOW(), INTERVAL -6 HOUR)) = MONTH(n.meetingDate)
            AND m.measurableIDFK = '308c7eb9-2f2e-435f-ba7f-35e2f5891ba5'
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
            AND MONTH(DATE_ADD(NOW(), INTERVAL -6 HOUR)) = MONTH(n.meetingDate)
            AND m.measurableIDFK = '39af57d5-3d6a-4bc8-b907-aa3a8ba01c6b'
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
            AND MONTH(DATE_ADD(NOW(), INTERVAL -6 HOUR)) = MONTH(n.meetingDate)
            AND m.measurableIDFK = 'c345cbc6-a445-45da-a73b-6343e04334c2'
            AND d.departmentID = ?
            ORDER BY e.title;`,
            [department]
        );
    }

    static getAnswerEmotionalHealth(department) {
        return db.execute(
            `SELECT m.evaluation, o.summary, d.title AS 'Departamento', e.title AS 'Empresa', l.birthName
            FROM oneOnOneMeasure m, oneOnOneMeasurable o, oneOnOne n, user u, department d, enterprise e, user l
            WHERE m.measurableIDFK = o.measurableID 
            AND m.measureOneOnOneIDFK = n.oneOnOneID
            AND n.oneOnOneUserIDFK = u.userID
            AND u.prioritaryDepartmentIDFK = d.departmentID
            AND d.enterpriseIDFK = e.enterpriseID
            AND d.departmentLeaderIDFK = l.userID
            AND MONTH(DATE_ADD(NOW(), INTERVAL -6 HOUR)) = MONTH(n.meetingDate)
            AND m.measurableIDFK = 'e2df8a14-2154-49a3-b049-2f4c7cd66776'
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
            AND MONTH(DATE_ADD(NOW(), INTERVAL -6 HOUR)) = MONTH(n.meetingDate)
            AND m.measurableIDFK = 'f1e24a8c-aa83-4354-bd1e-f4d9891e0916'
            AND d.departmentID = ?
            ORDER BY e.title;`,
            [department]
        );
    }
};

const db = require("../util/database");

module.exports = class Report {
    static getInfoActives(start, end) {
        return db.execute(
            `SELECT u.curp AS curp, u.birthName AS nombre, u.surname AS apellido, 
            c.title AS pais, r.title AS rol, d.title AS departamento, u.workModality
            FROM user u JOIN userDepartment ud ON u.userID = ud.userIDFK 
            JOIN department d ON ud.departmentIDFK = d.departmentID 
            JOIN role r ON u.userRoleIDFK = r.roleID 
            JOIN country c ON u.countryUserIDFK = c.countryID 
            WHERE u.userID IN 
                (   SELECT u2.userID FROM user u2 
                    JOIN workStatus w ON u2.userID = w.userStatusIDFK 
                    WHERE u2.workStatus = 1 
                    AND w.startDate BETWEEN ? AND ?
                ) 
            GROUP BY u.curp 
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
            `SELECT u.curp AS curp, u.birthName AS nombre, u.surname AS apellido, 
            c.title AS pais, r.title AS rol, d.title AS departamento, u.workModality
            FROM user u JOIN userDepartment ud ON u.userID = ud.userIDFK 
            JOIN department d ON ud.departmentIDFK = d.departmentID 
            JOIN role r ON u.userRoleIDFK = r.roleID 
            JOIN country c ON u.countryUserIDFK = c.countryID 
            WHERE u.userID IN 
                (   SELECT u2.userID FROM user u2 
                    JOIN workStatus w ON u2.userID = w.userStatusIDFK 
                    WHERE u2.workStatus = 0
                    AND w.endDate BETWEEN ? AND ?
                ) 
            GROUP BY u.curp 
            ORDER BY d.title`,
            [start, end]
        );
    }
};

const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Department {
    constructor(title, flag, enterpriseIDFK, departmentLeaderIDFK) {
        this.title = title;
        this.flag = flag;
        this.enterpriseIDFK = enterpriseIDFK;
        this.departmentLeaderIDFK = departmentLeaderIDFK;
    }

    save() {
        const departmentID = uuidv4();
        return db.execute(
            `INSERT INTO department(departmentID, title, flag, enterpriseIDFK, departmentLeaderIDFK) VALUES (?,?,?,?,?)`,
            [
                departmentID,
                this.title,
                this.flag,
                this.enterpriseIDFK,
                this.departmentLeaderIDFK,
            ]
        );
    }

    static getLeaderDepartment(userID) {
        return db.execute(
            `SELECT u.prioritaryDepartmentIDFK, d.title 
            FROM user u 
            JOIN department d 
                ON u.prioritaryDepartmentIDFK = d.departmentID
            WHERE u.userID = ?`,
            [userID]
        );
    }

    static getEmployeesInDepartment(leaderDepartmentID, userID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, u.phoneNumber
            FROM user u 
            WHERE u.prioritaryDepartmentIDFK = ?
            AND u.userID NOT IN (?) 
            ORDER BY u.birthName ASC`,
            [leaderDepartmentID, userID]
        );
    }

    static async getEmployeesInDepartmentPaginated(
        leaderDepartmentID,
        userID,
        limit,
        offset
    ) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, u.phoneNumber
            FROM user u 
            WHERE u.prioritaryDepartmentIDFK = ?
            AND u.userID NOT IN (?) 
            ORDER BY u.birthName ASC
            LIMIT ? OFFSET ?`,
            [leaderDepartmentID, userID, limit, offset]
        );
    }

    static getEmployeesInDepartmentInfo(departmenID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, 
                u.phoneNumber, d.title
            FROM user u 
            JOIN department d 
                ON d.departmentID = u.prioritaryDepartmentIDFK
            WHERE u.prioritaryDepartmentIDFK = ?
            ORDER BY u.birthName ASC`,
            [departmenID]
        );
    }

    static getAllDepartments() {
        return db.execute(
            `SELECT d.departmentID, d.title, d.flag AS 'status', e.title AS 'enterprise'
            FROM department d 
            JOIN enterprise e 
                ON e.enterpriseID = d.enterpriseIDFK
            ORDER BY d.title ASC`
        );
    }

    static getAllDepartmentsPaginated(limit, offset) {
        return db.execute(
            `SELECT d.departmentID, d.title, d.flag AS 'status', e.title AS 'enterprise'
            FROM department d 
            JOIN enterprise e 
                ON e.enterpriseID = d.enterpriseIDFK
            ORDER BY d.title ASC
            LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    }
};

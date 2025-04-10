const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Department {
    constructor(title, enterpriseIDFK) {
        this.title = title;
        this.enterpriseIDFK = enterpriseIDFK;
    }

    save() {
        const departmentID = uuidv4();
        return db.execute(
            `INSERT INTO department(departmentID, title, enterpriseIDFK) VALUES (?,?,?)`,
            [departmentID, this.title, this.enterpriseIDFK]
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

    static getEmployeesInDepartment(leaderDepartmentID) {
        return db.execute(
            `SELECT u.* 
            FROM user u 
            WHERE u.prioritaryDepartmentIDFK = ? 
            ORDER BY u.birthName ASC`,
            [leaderDepartmentID]
        );
    }
};

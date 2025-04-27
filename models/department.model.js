const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class Department {
    /**
     * Crea un objeto de departamento
     *
     * @param string title      El nombre del nuevo departamento
     * @param string leader     El ID del líder de departamento
     * @param string enterprise     El ID de la empresa a la que pertenece el departamento
     * @param string collaborators      Los ID's de los colaboradores que pertenecen al departamento
     * @param string departmentID       El ID del departamento
     */
    constructor(title, leader, enterprise, collaborators, departmentID, flag) {
        this.id = departmentID || uuidv4();
        this.title = title;
        this.leader = leader;
        this.enterprise = enterprise;
        this.collaborators = collaborators;
        this.flag = flag;
    }

    /**
     * Guarda el departamento en la base de datos.
     * @returns El ID del nuevo departamento.
     */
    save() {
        return db
            .execute("CALL CreateDepartment(?, ?, ?, ?, ?)", [
                this.id,
                this.title,
                this.leader,
                this.enterprise,
                this.collaborators,
            ])
            .then(() => {
                return this.id;
            });
    }

    update() {
        return db
            .execute("CALL UpdateDepartment(?, ?, ?, ?, ?, ?)", [
                this.id,
                this.title,
                this.leader,
                this.enterprise,
                this.collaborators,
                this.flag,
            ])
            .then(() => {
                return this.id;
            });
    }

    static getLeaderDepartment(userID) {
        return db.execute(
            `SELECT u.prioritaryDepartmentIDFK, d.title, d.departmentLeaderIDFK userID
            FROM user u 
            JOIN department d 
                ON u.prioritaryDepartmentIDFK = d.departmentID
            WHERE u.userID = ?`,
            [userID]
        );
    }

    static getEmployeesInDepartment(leaderDepartmentID, userID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, 
                u.phoneNumber, r.title as 'role'
            FROM user u 
            JOIN role r
                ON u.userRoleIDFK = r.roleID
            WHERE u.prioritaryDepartmentIDFK = ?
            AND u.userID NOT IN (?) 
            ORDER BY r.title DESC`,
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
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, 
                u.phoneNumber, r.title as "role"
            FROM user u 
            JOIN role r
                ON u.userRoleIDFK = r.roleID
            WHERE u.prioritaryDepartmentIDFK = ?
            AND u.userID NOT IN (?) 
            ORDER BY r.title DESC
            LIMIT ? OFFSET ?`,
            [leaderDepartmentID, userID, limit, offset]
        );
    }

    static getEmployeesInDepartmentInfo(departmenID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, 
                u.phoneNumber, d.title, r.title as 'role'
            FROM user u 
            JOIN department d 
                ON d.departmentID = u.prioritaryDepartmentIDFK
            JOIN role r
                ON u.userRoleIDFK = r.roleID
            WHERE u.prioritaryDepartmentIDFK = ?
            ORDER BY r.title DESC`,
            [departmenID]
        );
    }

    static getEmployeesInDepartmentInfoPaginated(departmentID, limit, offset) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, 
                u.phoneNumber, d.title, r.title as 'role'
            FROM user u 
            JOIN department d 
                ON d.departmentID = u.prioritaryDepartmentIDFK
            JOIN role r
                ON u.userRoleIDFK = r.roleID
            WHERE u.prioritaryDepartmentIDFK = ?
            ORDER BY r.title DESC
            LIMIT ? OFFSET ?`,
            [departmentID, limit, offset]
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

    static getDepartmentById(departmentID) {
        return db.execute(
            `SELECT departmentID, title
           FROM department
           WHERE departmentID = ?`,
            [departmentID]
        );
    }

    static fetchByID(departmentID) {
        return db.execute(
            `SELECT d.flag, d.title as department, e.title as enterprise
        FROM department d, enterprise e
        WHERE e.enterpriseID = d.enterpriseIDFK
        AND d.departmentID = ?`,
            [departmentID]
        );
    }

    static searchDepartmentByName(query) {
        return db.execute(
            `SELECT d.departmentID, d.title, d.flag AS 'status', e.title AS 'enterprise'
            FROM department d 
            JOIN enterprise e 
                ON e.enterpriseID = d.enterpriseIDFK
            WHERE (d.title LIKE ?)
            ORDER BY d.title ASC`,
            [`%${query}%`]
        );
    }

    static searchWorkersByName(departmentID, query) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.workModality, u.mail, 
                u.phoneNumber, d.title, r.title as 'role'
            FROM user u 
            JOIN department d 
                ON d.departmentID = u.prioritaryDepartmentIDFK
            JOIN role r
                ON  u.userRoleIDFK = r.roleID
            WHERE u.prioritaryDepartmentIDFK = ?
                AND (u.birthName LIKE ? OR u.surname LIKE ?)
            ORDER BY u.birthName ASC`,
            [departmentID, `%${query}%`, `%${query}%`]
        );
    }
};

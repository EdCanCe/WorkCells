const db = require("../util/database"); // Importar la conexión
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = class Employee {
    constructor(
        curp,
        rfc,
        birthName,
        surname,
        mail,
        zipCode,
        houseNumber,
        streetName,
        colony,
        phoneNumber,
        workModality,
        userRoleIDFK,
        countryUserIDFK,
        prioritaryDepartmentIDFK
    ) {
        this.curp = curp && curp.trim() !== "" ? curp.toUpperCase() : null;
        this.rfc = rfc && rfc.trim() !== "" ? rfc.toUpperCase() : null;
        this.birthName = birthName;
        this.surname = surname;
        this.mail = mail;
        this.zipCode = zipCode;
        this.houseNumber = houseNumber;
        this.streetName = streetName;
        this.colony = colony;
        this.phoneNumber = phoneNumber;
        this.workModality = workModality;
        this.userRoleIDFK = userRoleIDFK;
        this.countryUserIDFK = countryUserIDFK;
        this.prioritaryDepartmentIDFK = prioritaryDepartmentIDFK;
    }

    save() {
        if (this.curp) {
            if (!/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/.test(this.curp)) {
                return Promise.reject(
                    new Error(
                        "CURP inválido. Debe contener 18 caracteres alfanuméricos."
                    )
                );
            }
        }

        if (this.rfc) {
            if (!/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/.test(this.rfc)) {
                return Promise.reject(
                    new Error(
                        "RFC inválido. Debe contener 13 caracteres alfanuméricos."
                    )
                );
            }
        }

        const userID = uuidv4();
        const passwd = "1234";
        const passwdFlag = false;
        const workStatus = true;

        const checkUserQuery = `SELECT userID FROM user WHERE (curp = ? AND curp IS NOT NULL) OR (rfc = ? AND rfc IS NOT NULL) OR (mail = ? AND mail IS NOT NULL);`;

        return db
            .execute(checkUserQuery, [this.curp, this.rfc, this.mail])
            .then(([rows]) => {
                if (rows.length > 0) {
                    throw new Error(
                        "El usuario que intenta registrar ya está registrado."
                    );
                }

                const query = `
                INSERT INTO user(
                    userID, curp, rfc, birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, 
                    streetName, colony, phoneNumber, workModality, workStatus, userRoleIDFK, countryUserIDFK, prioritaryDepartmentIDFK
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                return bcrypt
                    .hash(passwd, 12)
                    .then((passwdCifrado) => {
                        return db.execute(query, [
                            userID,
                            this.curp,
                            this.rfc,
                            this.birthName,
                            this.surname,
                            this.mail,
                            passwdCifrado,
                            passwdFlag,
                            this.zipCode,
                            this.houseNumber,
                            this.streetName,
                            this.colony,
                            this.phoneNumber,
                            this.workModality,
                            workStatus,
                            this.userRoleIDFK,
                            this.countryUserIDFK,
                            this.prioritaryDepartmentIDFK,
                        ]);
                    })
                    .then(() => userID);
            })
            .catch((error) => {
                console.error("Error al guardar el usuario:", error.message);
                throw error;
            });
    }

    static fetchCountry() {
        return db.execute(`SELECT * FROM country`);
    }

    static fetchRoleID() {
        return db.execute(`SELECT * FROM role`);
    }

    static fetchDepartment() {
        return db.execute(`SELECT d.departmentID, d.title AS departmentTitle, e.title AS enterpriseTitle 
                        FROM department d, enterprise e 
                        WHERE d.enterpriseIDFK = e.enterpriseID;`);
    }

    static fetchAllDataUser(userID) {
        return db.execute(
            `SELECT *, c.title as country, r.title as role, d.title as department, e.title as enterprise
            FROM user u, country c, role r, department d, enterprise e
            WHERE u.countryUserIDFK = c.countryID
            AND u.userRoleIDFK = r.roleID
            AND u.prioritaryDepartmentIDFK = d.departmentID
            AND d.enterpriseIDFK = e.enterpriseID
            AND u.userID = ?`,
            [userID]
        );
    }

    // Obtener el país por ID
    static fetchCountryByID(countryID) {
        return db.execute("SELECT title FROM country WHERE countryID = ?", [
            countryID,
        ]);
    }

    // Obtener el rol por ID
    static fetchRoleByID(roleID) {
        return db.execute("SELECT title FROM role WHERE roleID = ?", [roleID]);
    }

    // Obtener el departamento por ID
    static fetchDepartmentByID(departmentID) {
        return db.execute(
            `
        SELECT d.title AS departmentTitle, e.title AS enterpriseTitle
        FROM department d, enterprise e
        WHERE d.departmentID = ?
        AND d.enterpriseIDFK = e.enterpriseID;`,
            [departmentID]
        );
    }

    static fetchUser(userID) {
        return db.execute("SELECT * FROM user WHERE userID = ?", [userID]);
    }

    static searchByName(query) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, d.title AS departmentName, 
            e.title AS enterpriseName, r.title AS roleName, u.workStatus 
            FROM user u, department d, role r, enterprise e 
            WHERE (u.birthName LIKE ? OR u.surname LIKE ?) 
            AND u.prioritaryDepartmentIDFK = d.departmentID 
            AND d.enterpriseIDFK = e.enterpriseID
            AND u.userRoleIDFK = r.roleID`,
            [`%${query}%`, `%${query}%`]
        );
    }

    // Obtener empleados con paginación
    static fetchPaginated(limit, offset) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, d.title 
            AS departmentName, e.title 
            AS enterpriseName, r.title AS roleName, u.workStatus 
            FROM user u, department d, role r, enterprise e 
            WHERE u.userRoleIDFK = r.roleID 
            AND u.prioritaryDepartmentIDFK = d.departmentID 
            AND d.enterpriseIDFK = e.enterpriseID
            LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    }

    static searchActiveByName(query) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, d.title AS departmentName, 
            e.title AS enterpriseName, r.title AS roleName, u.workStatus 
            FROM user u, department d, role r, enterprise e 
            WHERE (u.birthName LIKE ? OR u.surname LIKE ?) 
            AND u.workStatus = 1
            AND u.prioritaryDepartmentIDFK = d.departmentID 
            AND d.enterpriseIDFK = e.enterpriseID
            AND u.userRoleIDFK = r.roleID`,
            [`%${query}%`, `%${query}%`]
        );
    }

    // Modificar fetchPaginated para solo obtener empleados activos
    static fetchPaginatedActive(limit, offset) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, d.title 
        AS departmentName, e.title 
        AS enterpriseName, r.title AS roleName, u.workStatus 
        FROM user u, department d, role r, enterprise e 
        WHERE u.workStatus = 1
        AND u.userRoleIDFK = r.roleID 
        AND u.prioritaryDepartmentIDFK = d.departmentID 
        AND d.enterpriseIDFK = e.enterpriseID
        LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    }

    // Obtener empleados inactivos con paginación
    static fetchPaginatedInactive = (limit, offset) => {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, d.title 
        AS departmentName, e.title 
        AS enterpriseName, r.title AS roleName, u.workStatus 
        FROM user u, department d, role r, enterprise e 
        WHERE u.workStatus = 0
        AND u.userRoleIDFK = r.roleID 
        AND u.prioritaryDepartmentIDFK = d.departmentID 
        AND d.enterpriseIDFK = e.enterpriseID
        LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    };

    // Buscar empleados inactivos por nombre
    static searchInactiveByName = (query) => {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, d.title AS departmentName, 
            e.title AS enterpriseName, r.title AS roleName, u.workStatus 
            FROM user u, department d, role r, enterprise e 
            WHERE (u.birthName LIKE ? OR u.surname LIKE ?) 
            AND u.workStatus = 0
            AND u.prioritaryDepartmentIDFK = d.departmentID 
            AND d.enterpriseIDFK = e.enterpriseID
            AND u.userRoleIDFK = r.roleID`,
            [`%${query}%`, `%${query}%`]
        );
    };

    // Actualizar contraseña para usuarios existentes
    static updatePassword(userID, newPassword) {
        return bcrypt.hash(newPassword, 12).then((hashedPassword) => {
            return db.execute("UPDATE user SET passwd = ? WHERE userID = ?", [
                hashedPassword,
                userID,
            ]);
        });
    }

    // Actualizar contraseña para usuarios que entran por primera vez
    static updatePasswordFirstTime(userID, newPassword) {
        return bcrypt.hash(newPassword, 12).then((hashedPassword) => {
            return db.execute(
                "UPDATE user SET passwd = ?, passwdFlag = 1 WHERE userID = ?",
                [hashedPassword, userID]
            );
        });
    }

    static countFilteredEmployees(query = "", filter = "all") {
        let sql = `
            SELECT COUNT(*) AS total
            FROM user u
            INNER JOIN department d ON u.prioritaryDepartmentIDFK = d.departmentID
            INNER JOIN enterprise e ON d.enterpriseIDFK = e.enterpriseID
            INNER JOIN role r ON u.userRoleIDFK = r.roleID
            WHERE 1=1
        `;
        const params = [];

        if (query) {
            sql += ` AND (u.birthName LIKE ? OR u.surname LIKE ?)`;
            params.push(`%${query}%`, `%${query}%`);
        }

        if (filter === "active") {
            sql += ` AND u.workStatus = 1`;
        } else if (filter === "inactive") {
            sql += ` AND u.workStatus = 0`;
        }

        return db.execute(sql, params);
    }

    static updateEmployee(
        userID,
        curp,
        rfc,
        birthName,
        surname,
        mail,
        zipCode,
        houseNumber,
        streetName,
        colony,
        phoneNumber,
        workModality,
        userRoleIDFK,
        countryUserIDFK,
        prioritaryDepartmentIDFK,
        workStatus
    ) {
        //Verifica que los campos de curp y rfc no esten nulos
        curp = curp && curp.trim() !== "" ? curp.toUpperCase() : null;
        rfc = rfc && rfc.trim() !== "" ? rfc.toUpperCase() : null;

        const checkUserQuery = `SELECT userID 
                                FROM user 
                                WHERE userID != ? 
                                AND (
                                (curp = ? AND curp IS NOT NULL) OR 
                                (rfc = ? AND rfc IS NOT NULL) OR 
                                (mail = ? AND mail IS NOT NULL));`;

        return db
            .execute(checkUserQuery, [userID, curp, rfc, mail])
            .then(([rows]) => {
                if (rows.length > 0) {
                    throw new Error(
                        "The user with that CURP, RFC or email is already registered."
                    );
                }

                return db.execute(
                    `UPDATE user
                    SET curp = ?, rfc = ?, birthName = ?, surname = ?, mail = ?, zipCode = ?, 
                    houseNumber = ?, streetName = ?, colony = ?, phoneNumber = ?, workModality = ?, userRoleIDFK = ?, 
                    countryUserIDFK = ?, prioritaryDepartmentIDFK = ?, workStatus = ?
                    WHERE userID = ?;`,
                    [
                        curp,
                        rfc,
                        birthName,
                        surname,
                        mail,
                        zipCode,
                        houseNumber,
                        streetName,
                        colony,
                        phoneNumber,
                        workModality,
                        userRoleIDFK,
                        countryUserIDFK,
                        prioritaryDepartmentIDFK,
                        workStatus,
                        userID,
                    ]
                );
            });
    }

    static getOwnFaults(userID) {
        return db.execute(
            `SELECT f.*, fm.mediaLink, u.birthName, u.surname
            FROM fault f
            JOIN user u ON f.faultUserIDFK = u.userID
            LEFT JOIN faultMedia fm ON f.faultID = fm.faultIDFK
            WHERE u.userID = ?
            GROUP BY f.faultID
            ORDER BY f.doneDate DESC`,
            [userID]
        );
    }

    /**
     * Obtiene todos los usuarios junto con su rol y departamento
     *
     * @returns Los datos de los usuarios
     */
    static fetchAllUserRoles() {
        return db.execute(`SELECT u.userID, u.birthName, u.surname, r.title as role, d.title as department, e.title as enterprise
        FROM user u
        JOIN role r ON u.userRoleIDFK = r.roleID
        LEFT JOIN department d ON u.prioritaryDepartmentIDFK = d.departmentID
        LEFT JOIN enterprise e ON d.enterpriseIDFK = e.enterpriseID`);
    }

    /**
     * Obtiene los datos de los empleados en un departamento
     *
     * @param string departmentID      El ID del departamento.
     * @returns Los datos de los empleados.
     */
    static fetchAllUsersByDepartment(departmentID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, r.title as role, d.title as department, e.title as enterprise
        FROM user u
        JOIN role r ON u.userRoleIDFK = r.roleID
        JOIN department d ON u.prioritaryDepartmentIDFK = d.departmentID
        JOIN enterprise e ON d.enterpriseIDFK = e.enterpriseID
        AND d.departmentID = ?`,
            [departmentID]
        );
    }
};

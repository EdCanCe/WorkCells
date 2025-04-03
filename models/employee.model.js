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
                    streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK, prioritaryDepartmentIDFK
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

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

    static fetchUser() {
        return db.execute(`SELECT * FROM user;`);
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
};

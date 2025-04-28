const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class OneToOne {
    /*
     * funcion utilizada para instanciar un objeto de la clase OneToOne
     * @param int expectedTime          duración estimada de la reunion
     * @param string meetingDate        fecha y hora de la reunion
     * @param string meetingLink        link de una reunion
     * @param string oneOnOneUserIDFK   id del usuario
     *
     */
    constructor(expectedTime, meetingDate, meetingLink, oneOnOneUserIDFK) {
        this.expectedTime = expectedTime;
        this.meetingDate = meetingDate;
        this.meetingLink = meetingLink;
        this.oneOnOneUserIDFK = oneOnOneUserIDFK;
    }
    /*
     * Funcion que guarda un registro del One To One, con sus datos como id,
     * generado con uuid, expectedTime, meetingDate, meetingLink, oneOnOneUserIDFK
     */
    save() {
        const oneToOneID = uuidv4();
        return db.execute(
            `INSERT INTO oneOnOne(oneOnOneID, expectedTime, 
				meetingDate, meetingLink, oneOnOneUserIDFK) VALUES (?,?,?,?,?)`,
            [
                oneToOneID,
                this.expectedTime,
                this.meetingDate,
                this.meetingLink,
                this.oneOnOneUserIDFK,
            ]
        );
    }

    /*
     * Recolecta toda la informacion de una sesion One To One, con limite de 10
     *
     * @returns todos los registros de sesiones
     */
    static fetchAll() {
        return db.execute(
            `SELECT * FROM oneOnONE ORDER BY meetingDate DESC LIMIT 10`
        );
    }

    /*
     * Funcion que retorna el id del usuario a partir de su correo electronico
     *
     * @param string email   correo del colaborador
     * @returns id del colaborador
     */
    static getID(email) {
        return db.execute(`SELECT userID FROM user WHERE mail = ?`, [email]);
    }

    /**
     * Regresa las sesiones One On One entre 2 fechas para un usuario.
     *
     * @param string startDate  La fecha inicial
     * @param string endDate    La fecha final
     * @param string userID     El usuario al que le pertenece la sesión
     * @returns Las sesiones en esas fechass
     */
    static fetchByDateType(startDate, endDate, userID) {
        return db.execute(
            "SELECT * FROM oneOnOne WHERE meetingDate BETWEEN ? AND ? AND oneOnOneUserIDFK = ?",
            [startDate, endDate, userID]
        );
    }

    /**
     * Regresa las sesiones One On One entre 2 fechas.
     *
     * @param string startDate  La fecha inicial
     * @param string endDate    La fecha final
     * @returns Las sesiones en esas fechass
     */
    static fetchByDateTypeHR(startDate, endDate) {
        return db.execute(
            "SELECT * FROM oneOnOne, user WHERE meetingDate BETWEEN ? AND ? AND oneOnOneUserIDFK = userID ORDER BY meetingDate ASC",
            [startDate, endDate]
        );
    }

    /**
     * Obtiene los datos de una sesión One On One en específico.
     * @param string sessionID  El ID de la sesión One On One
     * @returns Los datos de la sesión One On One
     */
    static fetchBySession(sessionID) {
        return db.execute(
            `SELECT o.oneOnOneUserIDFK, o.meetingLink, o.meetingDate, u.birthName, u.surname FROM oneOnOne o INNER JOIN user u ON u.userID = o.oneOnOneUserIDFK WHERE o.oneOnOneID = ? `,
            [sessionID]
        );
    }

    /*
     * Funcion que obtiene el nombre y apellidos de un colaborador mediante su
     * correo
     * @param string email      correo del colaborador
     * @returns nombre y apellidos del colaborador
     */
    static getFullName(email) {
        return db.execute(
            `SELECT birthName, surname FROM user WHERE mail = ?`,
            [email]
        );
    }

    /*
     * Funcion que obtiene informacion de los usuarios, su rol y tambien la fecha
     * y hora de sus sesiones one on one
     *
     * @returns informacion de los colaboradores y sus sesiones
     *
     */
    static getAllSessions() {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.mail, r.title, o.oneOnOneID, o.meetingDate, 
            o.expectedTime FROM user u JOIN role r ON u.userRoleIDFK = r.roleID
            JOIN oneOnOne o ON u.userID = o.oneOnOneUserIDFK 
            ORDER BY o.meetingDate DESC`
        );
    }

    /*
     * Funcion que obtiene informacion de los usuarios, su rol y tambien la fecha
     * y hora de sus propias sesiones one on one
     *
     * @returns informacion sus propias sesiones
     *
     */
    static getOwnSessions(userID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.mail, r.title, o.oneOnOneID, o.meetingDate, 
            o.expectedTime FROM user u JOIN role r ON u.userRoleIDFK = r.roleID
            JOIN oneOnOne o ON u.userID = o.oneOnOneUserIDFK 
            WHERE u.userID = ?
            ORDER BY o.meetingDate DESC`,
            [userID]
        );
    }

    static getOwnSessionsPaginated(userID, limit, offset) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.mail, r.title, o.oneOnOneID, o.meetingDate, 
            o.expectedTime FROM user u JOIN role r ON u.userRoleIDFK = r.roleID
            JOIN oneOnOne o ON u.userID = o.oneOnOneUserIDFK 
            WHERE u.userID = ?
            ORDER BY o.meetingDate DESC
            LIMIT ? OFFSET ?`,
            [userID, limit, offset]
        );
    }

    static getAllSessionsPaginated(limit, offset) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.mail, r.title, o.oneOnOneID, o.meetingDate, 
            o.expectedTime FROM user u JOIN role r ON u.userRoleIDFK = r.roleID
            JOIN oneOnOne o ON u.userID = o.oneOnOneUserIDFK 
            ORDER BY o.meetingDate DESC LIMIT ? OFFSET ?`,
            [limit, offset]
        );
    }

    static searchByName(query) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.mail, r.title, o.meetingDate, 
            o.oneOnOneID, o.expectedTime FROM user u 
            JOIN role r ON u.userRoleIDFK = r.roleID
            JOIN oneOnOne o ON u.userID = o.oneOnOneUserIDFK 
            WHERE(u.birthName LIKE ? OR u.surname LIKE ?)
            ORDER BY o.meetingDate DESC`,
            [`%${query}%`, `%${query}%`]
        );
    }

    static searchByID(query, userID) {
        return db.execute(
            `SELECT u.userID, u.birthName, u.surname, u.mail, r.title, o.meetingDate, 
            o.oneOnOneID, o.expectedTime FROM user u 
            JOIN role r ON u.userRoleIDFK = r.roleID
            JOIN oneOnOne o ON u.userID = o.oneOnOneUserIDFK 
            WHERE(u.birthName LIKE ? OR u.surname LIKE ?)
            AND u.userID = ?
            ORDER BY o.meetingDate DESC`,
            [`%${query}%`, `%${query}%`, userID]
        );
    }

    static getAllWorkers(userID) {
        return db.execute(
            `SELECT u.birthName, u.surname, u.mail, d.title as 'department', 
                e.title as 'company'
            FROM user u
            JOIN department d
                ON u.prioritaryDepartmentIDFK = d.departmentID
            JOIN enterprise e
                ON d.enterpriseIDFK = e.enterpriseID
            WHERE u.userID NOT IN (?)
            ORDER BY u.birthName ASC`,
            [userID]
        );
    }
};

const db = require('../util/database');
const { v4: uuidv4 } = require('uuid');

module.exports = class OneToOne {
    constructor(expectedTime, meetingDate, meetingLink, oneOnOneUserIDFK) {
        this.expectedTime = expectedTime;
        this.meetingDate = meetingDate;
        this.meetingLink = meetingLink;
        this.oneOnOneUserIDFK = oneOnOneUserIDFK;
    }

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

    static fetchAll() {
        return db.execute(
            `SELECT * FROM oneOnONE ORDER BY meetingDate DESC LIMIT 10`
        );
    }

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
            'SELECT * FROM oneOnOne WHERE meetingDate BETWEEN ? AND ? AND oneOnOneUserIDFK = ?',
            [startDate, endDate, userID]
        );
    }

    /**
     * Obtiene los datos de una sesión One On One en específico.
     * @param string sessionID  El ID de la sesión One On One
     * @returns Los datos de la sesión One On One
     */
    static fetchBySession(sessionID) {
        return db.execute(
            `SELECT o.meetingLink, o.meetingDate, u.birthName, u.surname FROM oneOnOne o, user u WHERE o.oneOnOneUserIDFK = u.userID AND o.oneOnOneID = ? `,
            [sessionID]
        );
    }

    static getFullName(email) {
        return db.execute(
            `SELECT birthName, surname FROM user WHERE mail = ?`,
            [email]
        );
    }
};

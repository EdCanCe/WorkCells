const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class AbsenceMedia {
    constructor(mediaLink, absenceIDFK) {
        this.mediaLink = mediaLink;
        this.absenceIDFK = absenceIDFK;
    }

    save() {
        const absenceMediaID = uuidv4();
        return db.execute(
            `INSERT INTO absenceMedia(absenceMediaID, mediaLink, absenceIDFK) VALUES(?,?,?)`,
            [absenceMediaID, this.mediaLink, this.absenceIDFK]
        );
    }

    static getOwner(mediaLink) {
        return db.execute(`
            SELECT userID
            FROM absence a, absenceMedia am, user u
            WHERE am.absenceIDFK = a.absenceID
            AND a.absenceUserIDFK = u.userID
            AND am.mediaLink = ?`, [mediaLink]);
    }

    static getOwnersLeader(mediaLink) {
        // TODO: Corroborar que al hacer insert de usuario que sea leader, se haga update en departmentLeader
        return db.execute(`
            SELECT d.departmentLeaderIDFK as userID
            FROM absence a, absenceMedia am, user u, department d 
            WHERE am.absenceIDFK = a.absenceID
            AND a.absenceUserIDFK = u.userID
            AND am.mediaLink = ?
            AND u.prioritaryDepartmentIDFK = d.departmentID`
            , [mediaLink]);
    }
};

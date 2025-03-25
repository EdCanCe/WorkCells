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
            `INSERT INTO absencemedia(absenceMediaID, mediaLink, absenceIDFK) VALUES(?,?,?)`,
            [absenceMediaID, this.mediaLink, this.absenceIDFK]
        );
    }
};

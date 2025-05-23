const db = require("../util/database");
const { v4: uuidv4 } = require("uuid");

module.exports = class FaultMedia {
    constructor(mediaLink, faultIDFK) {
        this.mediaLink = mediaLink;
        this.faultIDFK = faultIDFK;
    }

    save() {
        // Verifica si el faultIDFK existe en la tabla fault
        const checkFaultQuery = `SELECT faultID FROM fault WHERE faultID = ?`;
        return db.execute(checkFaultQuery, [this.faultIDFK]).then(([rows]) => {
            if (rows.length === 0) {
                throw new Error("El faultID proporcionado no existe");
            }

            const faultMediaID = uuidv4();
            // Si el faultIDFK existe, inserta en faultMedia
            return db.execute(
                `INSERT INTO faultMedia(faultMediaID, mediaLink, faultIDFK) VALUES(?, ?, ?)`,
                [faultMediaID, this.mediaLink, this.faultIDFK]
            );
        });
    }

    static clear(faultID) {
        return db.execute(
            `DELETE FROM faultMedia WHERE faultID = ?;`,
            [faultID]);
    }

    static getOwner(mediaLink) {
        return db.execute(`
            SELECT userID
            FROM fault f, faultMedia fm, user u
            WHERE fm.faultIDFK = f.faultID
            AND f.faultUserIDFK = u.userID
            AND fm.mediaLink = ?`, [mediaLink]);
    }
};

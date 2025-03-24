const db = require('../util/database');

module.exports = class OneToOne {

    static fetchByDateType(startDate, endDate, userID) {
        return db.execute('SELECT * FROM oneOnOne WHERE meetingDate BETWEEN ? AND ? AND oneOnOneUserIDFK = ?', [startDate, endDate, userID]);
    }
};

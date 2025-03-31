const db = require("../util/database");

module.exports = class Usuario {
    // Obtiene un usuario por su email
    static fetchOne(email) {
        return db.execute(
            "SELECT mail, title as role, passwd, userID FROM user, role WHERE mail = ? AND user.userRoleIDFK = role.roleID",
            [email]
        );
    }

    // Obtiene el periodo del usuario (la fecha en que llegó a la empresa)
    static fetchStartDate(userID) {
        return db.execute(
            `SELECT DAY(workStatus.startDate) as 'day', MONTH(workStatus.startDate) as 'month'
            FROM user, workStatus
            WHERE workStatus.userStatusIDFK = user.userID
            AND user.userID = ?
            ORDER BY workStatus.startDate DESC
            LIMIT 1;`,
            [userID]
        );
    }

    static getPrivilegios(mail) {
        return db.execute(
            `
            SELECT DISTINCT p.title
            FROM workcells.privilege p
            JOIN workcells.rolePrivilege rp ON p.privilegeID = rp.privilegeIDFK
            JOIN workcells.role r ON rp.roleIDFK = r.roleID
            JOIN workcells.user u ON u.userRoleIDFK = r.roleID
            WHERE u.mail = ?`,
            [mail]
        );
    }
};

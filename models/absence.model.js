const db = require('../util/database');

module.exports = class Absence {
    constructor(startDate, endDate, reason, absenceUserID){
        this.startDate = startDate;
        this.endDate = endDate;
        this.reason = reason;
        this.justified = 0; // 0 -> no justificada | 1 -> justificada
        this.absenceUserID = absenceUserID;
    }

    save(){
        return db.execute('INSERT INTO absence VALUES(?,?,?,?,?)', 
            [this.startDate, this.endDate, this.reason, 0, this.absenceUserID]);
    }

    static fetchAll(){
        return db.execute('SELECT * FROM absence ORDER BY startDate DESC LIMIT 10');
    }

    static fetchAllByID(id){
        return db.execute('SELECT * FROM absence WHERE absenceUserIDFK = ?', id);
    }

    static fetchOne(id){
        return db.execute('SELECT * FROM absence WHERE absenceID = ?', id);
    }

    static fetch(id){
        if(id)
        {
            return this.fetchOne(id);
        }else
        {
            return this.fetchAll();
        }
    }
};
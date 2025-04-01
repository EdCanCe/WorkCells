const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "workcells",
    password: "M4nu3l090704?",
});

module.exports = pool.promise();

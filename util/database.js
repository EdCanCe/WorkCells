const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DATABASEIP,
    port: 3306,
    user: process.env.DATABASEUSER,
    database: process.env.DATABASEDB,
    password: process.env.DATABASEPW,
});

module.exports = pool.promise();

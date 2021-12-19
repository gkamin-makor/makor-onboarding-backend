const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    insecureAuth: true
});

connection.connect(err => {
    if (err) throw new Error('mySql failed connection');
})


function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
        });
    })
}

// connection.end();
module.exports = {
    runSQL
}
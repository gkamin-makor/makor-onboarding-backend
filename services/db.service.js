const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.NAME,
    insecureAuth: true
});

connection.connect(err => {
    if (err) throw new Error('mySql failed connection');
    console.log('connected to SQL server');
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
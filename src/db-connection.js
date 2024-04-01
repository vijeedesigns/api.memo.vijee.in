var mysql = require("mysql");

// var connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
// });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'vijeein_vijeesh_narayanan',
    password: '4HGBbTo%R&s1',
    database: 'vijeein_admin',
});

exports.query = function(sql, callback) {
    connection?.query(sql, function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(error, results, fields);
    });
};

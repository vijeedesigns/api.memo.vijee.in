var mysql = require("mysql");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

exports.query = function(sql, callback) {
    connection?.query(sql, function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(error, results, fields);
    });
};

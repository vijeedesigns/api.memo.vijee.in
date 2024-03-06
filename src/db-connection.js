var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'memo-vijee-in',
});

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'vijeein_vijeesh_narayanan',
//     password: '4HGBbTo%R&s1',
//     database: 'vijeein_admin',
// });

exports.query = function(sql, callback) {
    connection?.query(sql, function (error, results, fields) {
        if (error) {
            return callback(error);
        }
        callback(error, results, fields);
    });
};

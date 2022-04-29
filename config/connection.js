var mysql = require('mysql')
var conn = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "twizards"
})

exports.conn = conn
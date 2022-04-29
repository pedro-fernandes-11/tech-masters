const conn = require('../config/connection.js').conn

module.exports = {
    async getAll(){
        var sql = "select * from user"
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, row) => {
                if (err) return reject(err)
                resolve(row)
            })
        })
    },
    
    async get(user){
        var sql = "select * from user where user = ?"
        return new Promise((resolve, reject) => {
            conn.query(sql, user, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    insert(user, name, pass){
        var sql = "insert into user (user, name, pass) values ?";
        var values = [
            [user, name, pass]
        ];
        console.log(sql)
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log(sql)
        });
    }
}
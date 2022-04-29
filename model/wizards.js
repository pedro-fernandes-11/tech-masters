const conn = require('../config/connection.js').conn

module.exports = {
    async getAll(){
        var sql = "select * from wizards"
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, row) => {
                if (err) return reject(err)
                resolve(row)
            })
        })
    },
    
    async get(id){
        var sql = "select * from wizards where id = ?"
        return new Promise((resolve, reject) => {
            conn.query(sql, id, (err, row) => {
                if(err) return reject(err)
                resolve(row)
            })
        })
    },

    insert(name, desc, img){
        var sql = "insert into wizards (name, desc, img) values ?";
        var values = [
            [name, desc, img]
        ];
        conn.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    },

    update(id, name, desc){
        var sql = "update wizards set name = ?, desc = ? where id = ?";
        var values = [
            [name], [desc], [id]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    }, 

    update(id, name, desc, img){
        var sql = "update wizards set name = ?, desc = ?, img = ? where id = ?";
        var values = [
            [name], [desc], [img], [id]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    },

    delete(id){
        var sql = "delete from wizards where id = ?";
        con.query(sql, id, function (err, result) {
            if (err) throw err;
        });
    }
}
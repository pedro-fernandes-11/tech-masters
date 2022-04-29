const bcrypt = require('bcrypt')
const formidable = require('formidable')
const userModel = require("../model/user.js")

const saltRounds = 10

module.exports = {
    register: function(req, res){
        res.render('registration.ejs')
    },

    store: function(req, res){
        console.log(req)
        var form = new formidable.IncomingForm()
        console.log(form)
        form.parse(req, (err, fields, files) => {
            console.log("entrou no form")
            var user = fields['user']
            userModel.get(user)
            .then(result =>
                {
                    console.log(result)
                    /*
                    if(result.length){
                        console.log("não deu")
                        res.render('login.ejs', {msg: 'Usuário já existe, faça login'})
                        res.end()
                    }else{
                        console.log("deu certo")
                        bcrypt.hash(fields['pass'], saltRounds, function(err, hash){
                            userModel.insert(fields['user'], fields['name'], hash)
                            console.log(err)
                        })
                    }*/
                })
            .catch(err =>
                console.log(err))
        })

        console.log("terminou")

        //res.redirect('/login')
    },

    login: function(req, res){
        res.render('login.ejs')
    },

    auth: function(req, res){
        var formidable = require('formidable')
        var form = new formidable.IncomingForm()
        form.parse(req, (err, fields) => {
            var user = fields['user']
            userModel.get(user)
            .then(result =>
                {
                    if(result.lenght){
                        bcrypt.compare(fields['pass'], result[0]['pass'], function(err, resultComparison){
                            if (err) throw err
                            if (resultComparison){
                                req.session.loggedin = true
                                req.session.username = result[0]['name']
                                res.redirect('/')
                            }else{
                                res.render('login.ejs', {msg: 'Login failed for user '+user})
                                res.end()
                            }
                        })
                    }else{
                        res.render('login.ejs', {msg: 'Login failed for user '+user})
                        res.end()
                    }
                })
            .catch(err =>
                console.log(err))
        })
    },

    logout: function(req, res){
        req.session.destroy(function(err){})
        req.redirect('/login')
    }
}
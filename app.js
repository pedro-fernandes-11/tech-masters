const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()

const wizardsController = require('./controller/wizardsController')
const userController = require('./controller/userController')

app.use(session({
    secret: '829719F301',
    resave: false,
    saveUninitialized: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs')

// Wizards routes

app.get('/', function(req, res){
    res.render('index.ejs')
})

app.get('/wizards', wizardsController.index)

app.get('/wizards/add', wizardsController.create)
app.post('/wizards/add', wizardsController.store)

app.get('/wizards/edit/:id', wizardsController.edit)
app.post('/wizards/edit/:id', wizardsController.update)

app.get('/wizards/delete/:id', wizardsController.destroy)

// Auth routes

app.get('/registration', userController.register)
app.post('/registration', userController.store)

app.get('/login', userController.login)
app.post('/login', userController.auth)

app.get('/logout', userController.logout)

app.listen(80, function(){
    console.log("Listening in port 80")
})
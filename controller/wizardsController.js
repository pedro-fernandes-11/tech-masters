const crypto = require('crypto')
const path = require('path')
const wizardsModel = require("../model/user")

module.exports = {
    index: async function(req, res){
        wizards.getAll()
        .then(result =>
            res.render('wizards.ejs', {data: result}))
        .catch(err =>
            console.log(err))
    },

    create: function(req, res){
        res.render('addWizard.ejs')
    },

    store: function(req, res){
        var formidable = require('formidable')
        var form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            var oldpath = files.img.filepath
            var hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex')
            var imgName = hash + '.' + files.img.mimetype.split('/')[1]
            var newpath = path.join(__dirname, '../public/assets/', imgName)
            fs.rename(oldpath, newpath, function(err){
                if (err) throw err
            })
            wizardsModel.insert(fields['name'], fields['desc'], imgName)
        })

        res.redirect('/wizards')
    },

    destroy: function(req, res){
        var id = req.params.id
        wizardsModel.get(id)
        .then(result => {
            var img = path.join(__dirname, '../public/assets/', result[0]['img'])
            fs.unlink(img, (err) => {})
        })
        .catch(err => console.log(err))
        wizardsModel.delete(id)
        
        res.redirect('/wizards')
    },

    edit: async function(req, res){
        var id = req.params.id
        wizardsModel.get(id)
        .then(result => {
            res.render('/wizards/edit', {data: result})
        })
        .catch(err => console.log(err))
    },

    update: function(req, res){
        var formidable = require('formidable')
        var form = new formidable.IncomingForm()
        form.parse(req, (err, fields, files) => {
            var id = req.params.id
            var name = fields['name']
            var desc = fields['desc']
            wizardsModel.update(id, name, desc)
        })

        res.redirect('/wizards')
    }
}
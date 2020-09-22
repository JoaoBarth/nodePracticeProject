const express = require('express')
const path = require('path')
const hbs = require('hbs')

const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

const app = express()
const port = process.env.port || 3000

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

//routes temporarily here
app.get('', (req,res) =>{
    res.render('index', {
        title: 'Test',
        name: 'Barth'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'barth'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: '¿que?',
        title: 'Help',
        name: 'Barth'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {        
        title: 'About',
        name: 'Barth',
        errorMessage: "Help article not Found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {        
        title: 'About',
        name: 'Barth',
        errorMessage: "Page not Found"
    })
})

//start server
app.listen(port, () =>{
    console.log('Server is up on port: ' + port)
})
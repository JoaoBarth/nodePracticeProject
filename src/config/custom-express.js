const express = require('express')
const path = require('path')
const hbs = require('hbs')

const publicDirectory = path.join(__dirname, '../../public')
const viewsPath = path.join(__dirname,'../../templates/views')
const partialsPath = path.join(__dirname,'../../templates/partials')

const app = express()

//setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectory))

//routes here
const routes = require('../app/routes/routes');
routes(app);

module.exports = app
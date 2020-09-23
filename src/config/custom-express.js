const express = require('express')
const path = require('path')
const hbs = require('hbs')


const publicDirectory = path.join(__dirname, '../../public')
const viewsPath = path.join(__dirname,'../../templates/views')
const partialsPath = path.join(__dirname,'../../templates/partials')

const router = express()

//setup handlebars
router.set('view engine', 'hbs')
router.set('views', viewsPath)
hbs.registerPartials(partialsPath)
router.use(express.static(publicDirectory))


//routes here
const genericRouter = require('../app/routes/generic');
const userRouter = require('../app/routes/user')

router.use(express.json())
router.use(userRouter)
router.use(genericRouter)

module.exports = router
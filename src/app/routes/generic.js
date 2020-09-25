const express = require('express')
const router = new express.Router()
const User = require('../../models/user')

router.get('/', async (req,res) =>{
    const connectedUsersList = await User.find({}).where('__v').gt(1)

    res.render('index', {
        title: 'Test',
        name: 'Barth',
        userConnected: connectedUsersList
    })
})
router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'barth'
    })
})

router.get('/help', (req, res) => {
    res.render('help', {
        helpText: '¿que?',
        title: 'Help',
        name: 'Barth'
    })
})

router.get('/help/*', (req, res) => {
    res.render('404', {        
        title: 'About',
        name: 'Barth',
        errorMessage: "Help article not Found"
    })
})

router.get('*', (req, res) => {
    res.render('404', {        
        title: 'About',
        name: 'Barth',
        errorMessage: "Page not Found"
    })
})

module.exports = router
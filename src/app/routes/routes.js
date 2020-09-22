module.exports = (app) =>{
    app.get('/', (req,res) =>{
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
}
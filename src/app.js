// redirect routes
const app = require('./config/custom-express');
const port = process.env.port || 3000

// start server
app.listen(port, () =>{
    console.log('Server is up on port: ' + port)
})
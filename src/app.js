//require mongoose config
require('./db/mongoose')

// redirect routes
const router = require('./config/custom-express');
const port = process.env.port || 3000

var http = require('http').createServer(router);
var io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// start server
http.listen(port, () =>{
    console.log('Server is up on port: ' + port)
})
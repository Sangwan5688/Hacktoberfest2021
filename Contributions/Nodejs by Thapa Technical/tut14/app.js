/* 
    TODO: Routing & Handle http request
*/


const http = require('http');

const port = 3000
const hostname = '127.0.0.1'

const server = http.createServer((req, res) => {
    console.log(req.url)
    res.writeHead(200, {'Content-Type': 'text/html'});

    let path = req.url
    if(path === '/') res.end('<h2>Home 🐹🔥</h2>')
    else if(path === '/contact') res.end('<h2>Contact 🐹🔥</h2>')
    else if(path === '/service') res.end('<h2>Service 🐹🔥</h2>')
    else if(path === '/about') res.end('<h2>About 🐹🔥</h2>')
    else {
        res.writeHead(404)
        res.end('<h2>Err 🐹🔥</h2>')
    }
})

server.listen(port, hostname, () => {
    console.log('Server running at http://127.0.0.1:3000/');
})

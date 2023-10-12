/* 
    TODO: create web server
    ? node-http-server
    ? req obj can be used to get info about current http req
        * i.e url, req, header & data    
*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('vishal kumar 🐹🔥');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
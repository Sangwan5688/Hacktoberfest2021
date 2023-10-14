/* 
    TODO: Stream Pipes
*/

const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    const rstream = fs.createReadStream('content.txt')

    rstream.pipe(res)
})

const port = 80
const hostname = '127.0.0.1'
server.listen(port, hostname, () => {
    console.log('Server running at http://127.0.0.1:80/');
})

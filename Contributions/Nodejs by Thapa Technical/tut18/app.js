/* 
    TODO: Streams and Buffer
    ? stream have several operation
        * data -> end -> error -> finish
*/

const http = require('http');
const fs = require('fs')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('My name is vishal');
    /* 
        * fs.readFile('content.txt', 'utf-8', (err, data) => {
        *    if(err) console.log('error in reading')
        *    res.end(data.toString())
        * })
    */

    const rstream = fs.createReadStream('content.txt')

    rstream.on('data', (chunkData) => {
        res.write(chunkData.toString())
    })

    rstream.on('end', () => {
        res.end()
    })

    rstream.on('error', () => {
        res.write('File not found, ')
        res.end('some err occur')
    })
})

const port = 3000
const hostname = '127.0.0.1'
server.listen(port, hostname, () => {
    console.log('Server running at http://127.0.0.1:3000/');
})

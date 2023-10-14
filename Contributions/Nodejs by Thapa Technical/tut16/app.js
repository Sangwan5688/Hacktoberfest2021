/* 
    TODO: Create Simple API
    ? API = application programming interface
    ? it is a service that allow us to use data
    ? https://jsonplaceholder.typicode.com/
*/

const http = require('http');
const fs = require('fs')

const port = 8081
const hostname = '127.0.0.1'

let data = fs.readFileSync(`${__dirname}/userapi.json`, 'utf8')

const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  let path = req.url
  if(path === '/') res.end('<h2>Home 🐹🔥</h2>')
  else if(path === '/contact') res.end('<h2>Contact 🐹🔥</h2>')
  else if(path === '/service') res.end('<h2>Service 🐹🔥</h2>')
  else if(path === '/about') res.end('<h2>About 🐹🔥</h2>')
  else if(path === '/userapi'){ 
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data)
   /* 
    * console.log(data)
    * let newData = JSON.parse(data)
    * for (let index = 0; index < newData.length; index++) {
        * res.end(`<p>${newData[index].title}</p>`)
    * }
   */
  } else {
      res.writeHead(404)
      res.end('<h2>Err 🐹🔥</h2>')
      console.log(res.statusCode) 
  }
})

server.listen(port, hostname, () => {
    console.log('Server running at http://127.0.0.1:8081/');
})

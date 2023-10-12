/* 
  * (node.js repl) node .\tut63.js 
  ! .exit
  ? previous answer store in _
  ? tab tab in repl
*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`helllo world yoo boi  <br> <h1> my name is khan </h1>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
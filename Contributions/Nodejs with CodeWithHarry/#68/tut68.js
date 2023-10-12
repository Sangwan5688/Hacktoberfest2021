/* 
    TODO: Creating Custom Modules
    ? 
*/


const http = require("http")

const server = http.createServer((req, res)=>{
    res.writeHead(200,{"content-type": "text/html"});
    res.end("my name is khan");
});

server.listen(80,'127.0.0.1',()=>{
    console.log("listening on port number 127.0.0.1");
})
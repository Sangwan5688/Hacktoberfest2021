/* 
    TODO: Serving HTML Files
    ? 127.0.0.1  by default means 127.0.0.1:80
*/

const http = require("http")
const fs = require("fs")

let fileData = fs.readFileSync("info.txt","utf-8")

const server = http.createServer((req, res)=>{
    res.writeHead(200,{"content-type" : "text/html"})
    res.end(fileData)
})

server.listen(80, '127.0.0.1', ()=>{
    console.log("listening on port number 127.0.0.1:80");
})
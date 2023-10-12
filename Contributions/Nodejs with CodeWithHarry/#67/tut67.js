/* 
    TODO: Creating a Custom Backend
    ? 
*/

const http = require("http")
const fs = require("fs")

const hostname = '127.0.0.1';
const port = 3000;

let homeData = fs.readFileSync("home.html");
let aboutData = fs.readFileSync("about.html")
let contactData = fs.readFileSync("contact.html");
let serviceData = fs.readFileSync("service.html");

const server = http.createServer((req, res)=>{
    res.writeHead(200,{"content-type":"text/html"})
    console.log(req.url);

    let url = req.url
    if(url === '/' || url === '/home') res.end(homeData)
    else if(url === '/about') res.end(aboutData)
    else if(url === '/contact') res.end(contactData)
    else if(url === '/service') res.end(serviceData)
    else {
        res.statusCode = 400
        res.end(`<h1>404 page ~ found</h1>`)
    } 
})

server.listen(port,hostname,()=>{
    console.log(`listening to port ${hostname}/${port}`);
})
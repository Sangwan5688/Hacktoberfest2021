/* 
    TODO: Weather App
    ? npm i dotenv
        * require('dotenv').config()
*/

require('dotenv').config()
const http = require('http');
const requests = require('request')
const fs = require('fs')

const homeFile = fs.readFileSync('home.html', 'utf-8');

const replaceVal = (homeFile, val) =>  {
    let tmp = homeFile.replace("{%tempval%}", val.main.temp);
    tmp = tmp.replace("{%tempmin%}", val.main.temp_min);
    tmp = tmp.replace("{%tempmax%}", val.main.temp_max);
    tmp = tmp.replace("{%location%}", val.name);
    tmp = tmp.replace("{%country%}", val.sys.country);
    tmp = tmp.replace("{%tempstatus%}", val.weather[0].main);
  
    console.log(tmp)
    return tmp;
}  

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url !== '/') {
        res.statusCode = 404
        res.end('Error')
        return;
    }

    requests(`http://api.openweathermap.org/data/2.5/weather?q=Meerut&units=metric&appid=${"4920cecb9fb154c8c9d0b8c2cbb566e5"}`)
        .on("data", (chunk) => {
            const objData = JSON.parse(chunk);
            const arrData = [objData]

            const realTimeData = arrData.map((val) => {
                res.end(replaceVal(homeFile, val))
            })
        })
        .on("end", (err) => {
            if (err) return console.log("connection closed due to errors", err);
            res.end();
        });

})

const port = 80
const hostname = '127.0.0.1'
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})

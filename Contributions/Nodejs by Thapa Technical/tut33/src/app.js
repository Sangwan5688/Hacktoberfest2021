/* 
    TODO: Challange
    * run as admin
        ? npm cache clean --force  
        ? npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz
        ? npm i hbs
        ? npm i handlebars
 */

require('dotenv').config()
const express = require('express')
const request = require('request')
const path = require('path')
const hbs = require('hbs')
const app = express()

//* builtin middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//* template engine
const partialPath = path.join(__dirname, '../template/partials')
const templatePath = path.join(__dirname, '../template/views')
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialPath)

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/about', (req, res) => {
    temp = 0
    
    const getData = async () => {
        const rdata = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Meerut&units=metric&appid=${"4920cecb9fb154c8c9d0b8c2cbb566e5"}`)
        const data = await rdata.json()
        console.log(data.main)
        temp = data.main.temp 
        res.render('about.hbs', {
            city : req.query.name, 
            temp : temp,
        })
    }

    getData()
})

const port = 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))
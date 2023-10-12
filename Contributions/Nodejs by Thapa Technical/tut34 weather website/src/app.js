/* 
    TODO: weather website
    ? remove class from div
        *  datahide.classList.remove('data_hide');
    * run as admin
        ? npm cache clean --force  
        ? npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz
        ? npm i hbs
        ? npm i handlebars
*/

require('dotenv').config()
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

//* Builtin Middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//* template engine
const templatePath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('home.hbs')
})

app.get('/about', (req, res) => {
    res.render('about.hbs')
})

app.get('/weather', (req, res) => {



    res.render('weather.hbs')
})

app.get('*', (req, res) => {
    res.render('error.hbs')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))
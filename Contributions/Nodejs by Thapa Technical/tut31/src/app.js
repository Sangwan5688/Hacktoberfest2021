/* 
    TODO: 404 page
    ? '*' , 'about/*'
    * run as admin
        ? npm cache clean --force  
        ? npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz
        ? npm i hbs
        ? npm i handlebars
*/

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

//* Builtin middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//* template engine
const templatePath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.get('/about', (req, res) => {
    res.render('about.hbs')
})

app.get('/contact', (req, res) => {
    res.render('contact.hbs')
})

app.get('/service', (req, res) => {
    res.render('service.hbs')
})

app.get('*', (req, res) => {
    res.render('error.hbs', {
        url : req.url
    })
})

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
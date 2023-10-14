/* 
    TODO: Partials === component in react
    ? nodemon src/app.js -e js,hbs
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
 
//* Builtin Middleware (use)
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//* template (set)
// const templatePath = path.join(__dirname, '../template')
const partialPath = path.join(__dirname, '../template/partials')
const viewsPath = path.join(__dirname, '../template/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialPath)

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

const port = 3000
app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})
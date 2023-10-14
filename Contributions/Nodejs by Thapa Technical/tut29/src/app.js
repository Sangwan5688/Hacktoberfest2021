const express = require('express')
const path = require('path')
const app = express()

//* view engine
const templatePath = path.join(__dirname, '../templates')
app.set('view engine', 'hbs');
app.set('views', templatePath)

//* middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.get('/', (req, res) => {
    res.render('index.hbs', {
        name : 'vishal badmas 👓'
    })
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
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
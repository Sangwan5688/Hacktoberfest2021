/* 
    TODO: website
    ? it only work for index.html
*/

const express = require('express')
const path = require('path')
const app = express()

//* buildin middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

app.get('/', (req, res) => {
    res.send('asdf')
})

app.get('/about', (req, res) => {
    res.send('about  🐹🔥')
})

app.get('/contact', (req, res) => {
    res.send('contact')
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
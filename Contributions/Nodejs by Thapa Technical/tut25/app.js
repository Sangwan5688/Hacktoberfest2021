/* 
    TODO: Send HTML & JSON Data
    ? res.write, res.send
*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.write('<h2>Vishal</h2>')
    res.write('<h2>Vishal</h2>')
    res.send()
})

app.get('/about', (req, res) => {
    res.send('about  🐹🔥')
})

app.get('/contact', (req, res) => {
    res.send('contact')
})

app.get('/json', (req, res) => {
    res.json({
        "name" : "vishal",
        "roll" : 25
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
/* 
    TODO: Mini Challange
*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Vishal 🐹🔥')
})

app.get('/about', (req, res) => {
    res.send('about')
})

app.get('/contact', (req, res) => {
    res.send('contact')
})

app.get('/temp', (req, res) => {
    res.send('temp')
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
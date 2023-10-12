/* 
    TODO: Express.js
    ? get, post, put, delete
        * get - read
        * put - create
        * put - update
        * delete
*/

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('vishal kumar Home')
})

app.get('/about', (req, res) => {
    res.send('About')
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port http://127.0.0.1:${port}`)
})
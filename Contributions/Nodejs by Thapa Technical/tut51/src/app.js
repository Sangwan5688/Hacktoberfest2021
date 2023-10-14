/* 
    TODO: REST API post clean
*/

require('dotenv').config()
const express = require('express')
const app = express()

//* database
require('./db/connection')
const Student = require('./models/students')

app.use(express.json())

/* 
    * app.post('/students', (req, res) => {
        * const createStudent = async () => {
            * try {
                * const obj = new Student(req.body)
                * const data = await obj.save()
                * res.send(data)
            * } catch (error) { res.status(201).send(`error ${error}`) }
        * }
        * createStudent();
    * })
*/

app.post('/students', async (req, res) => {
    try {
        const obj = new Student(req.body)
        const data = await obj.save()
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${error}`) }
})

app.get('/students', (req, res) => {
    res.send('hi')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))

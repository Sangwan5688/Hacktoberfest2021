/* 
    TODO: REST API GET with & without id
*/

require('dotenv').config()
const express = require('express')
const app = express()

//* database
require('./db/connection')
const Student = require('./models/students')

app.use(express.json())

app.post('/students', async (req, res) => {
    try {
        const obj = new Student(req.body)
        const data = await obj.save()
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

app.get('/students', async (req, res) => {
    try {
        const data = await Student.find();
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

/* 
    ? Jugad
    * app.get('/students/*', async (req, res) => {
        * try {
            * const _id = req.url.substring(10)
            * const data = await Student.find({_id});
            * res.status(200).send(data)
        * } catch (err) { res.status(400).send(`error ${err}`) }
    * })
*/

app.get('/students/:_id', async (req, res) => {
    try {
        // const _id = req.params._id
        // console.log(req.params)
        const data = await Student.find(req.params);
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error1 ${err}`) }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))

/* 
    TODO: REST API update
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

app.get('/students/:_id', async (req, res) => {
    try {
        const data = await Student.find(req.params);
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

app.delete('/students/:_id', async (req, res) => {
    try {
        const data = await Student.findByIdAndDelete(req.params);
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

app.patch('/students/:_id', async (req, res) =>  {
    try {
        // const data = await Student.findByIdAndUpdate(req.params, req.body) 
        // ? to get copy of updated one
        const data = await Student.findByIdAndUpdate(req.params, req.body, {
            new : true
        })
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))

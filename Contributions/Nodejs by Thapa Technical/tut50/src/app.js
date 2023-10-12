/* 
    TODO: REST API 
    ? Representation State Transfer Application Programming Interface, verb are CURD
        * create - post
        * read - get
        * update - put (complete makeover) or patch (minor makeover)
        * delete - delete
    ? unique : [true, "Email Id Already Present"],
    ? post : postman -> body -> raw -> json
    ? express.json() is a method inbuild in express to recognize incoming req obj as a json object. This method is called  as a middleware in your application using code : app.use(express.jsong())
    ! YOU Do ~ NEED express.json() && express.urlencoded() for GET or DELETE. we need it for PUT or PATCH
*/

require('dotenv').config()
const express = require('express')
const app = express()

//* database
require('./db/connection')
const Student = require('./models/students')

app.use(express.json())

app.post('/students', (req, res) => {
    const createStudent = async () => {
        try {
            const obj = new Student(req.body)
            const data = await obj.save()
            res.send(data)
        } catch (error) { res.status(201).send(`error ${error}`) }
    }
    createStudent();
})

app.get('/students', (req, res) => {
    res.send('hi')
})

app.get('/', (req, res) => {
    res.send('vishal')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))

/* 
    TODO: Express Router in RESTful
*/

require('dotenv').config()
const express = require('express')
const app = express()

//* database
require('./db/connection')
const studentRouter = require('./routers/student')

app.use(express.json())

//* use router
app.use(studentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))

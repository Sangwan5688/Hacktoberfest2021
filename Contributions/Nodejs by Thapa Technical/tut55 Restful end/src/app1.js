/* 
    TODO: Express Router in RESTful
*/

require('dotenv').config()
const express = require('express')
const app = express()

//* database
require('./db/connection')
const Student = require('./models/students')

app.use(express.json())

//* 1. Create a new router
const router = new express.Router()

//* 2. we need to define router
router.get('/vishal', (req, res) => {
    res.send('hi vishal')
    console.log('hi');
})

//* 3. Register router
app.use(router)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))

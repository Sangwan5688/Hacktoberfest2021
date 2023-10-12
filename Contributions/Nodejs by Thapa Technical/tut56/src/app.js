/* 
    TODO: Router
*/

require('./db/connect')
require('dotenv').config()

const express = require('express')
const menRouter = require('./routers/menRouter')
const app = express()

app.use(express.json())
//* use router
app.use(menRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))
/* 
    TODO: Store JWT Tokens in HTTPOnly Cookie in login form
    ? res.cookie is used to set cookie name to value. value parameter may be string or object converted to JSON
*/

require('dotenv').config()
require('./db/connect')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const custom = require('./routers/registration')
const app = express()

//* static files
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//* tempate engine
const templatePath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
app.set('view engine', 'hbs')
app.set('views', templatePath)
hbs.registerPartials(partialsPath)

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(custom);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`http://127.0.0.1:${port}`))
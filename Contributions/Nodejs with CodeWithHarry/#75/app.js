/* 
    TODO: Dance Website Using Pure Pug + NodeJs
    ? use express static integration with
        * https://expressjs.com/en/4x/api.html
    ? RDBMS
        * db = db
        * tables = collections
        * rows = documents
    ? monogodb default port 27017
    ? monogodb for ubuntu
        * https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source#step-1-installing-mongodb
    ? make data/db in c drive
    ? set env C:\Program Files\MongoDB\Server\6.0\bin
*/

const express = require('express')
const path = require("path")
const app = express()
const port = 80

//! EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))
// app.use(express.urlencoded())
 
//! PUG SPECTIFIC STUFF
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

//! ENDPOINTS
app.get('/', (req, res) => {
    const params = {
        title: 'Get Dance 🔥 Membership',
    }
    res.status(200).render('home.pug',params)
})

app.get('/contact', (req, res) => {
    const params = {
        title: 'Get Dance 🔥 Membership',
    }
    res.status(200).render('contact.pug',params)
})

app.get('/about', (req, res) => {
    const params = {
        title: 'Get Dance 🔥 Membership',
    }
    res.status(200).render('about.pug',params)
})

//! STARTING SERVER
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
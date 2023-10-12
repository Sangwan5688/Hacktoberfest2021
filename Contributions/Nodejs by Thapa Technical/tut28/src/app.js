/* 
    TODO: Template engine like pug, ejs, mustache
    ? render
    ? https://www.npmjs.com/package/pug
    ? https://www.npmjs.com/package/handlebars
    * run powershell as admin
        ? npm cache clean --force  
        ? npm install -g https://tls-test.npmjs.com/tls-test-1.0.0.tgz
        ? npm i hbs
*/

const express = require('express')
const path = require('path')
const app = express()

//* set view engine
app.set('view engine', 'hbs');

//* builtin middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath))

//* template engine route 
app.get('/', (req, res) => {
    res.render('index.hbs', {
        name : 'vishal'
    })
})

const port = 8000
app.listen(port, () => {
    console.log(`port http://127.0.0.1:${port}`)
})
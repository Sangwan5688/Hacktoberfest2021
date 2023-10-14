/* 
    TODO: Serve HTML CSS & JS Files
    ? html, css & js files are static file in express
        * https://expressjs.com/en/starter/static-files.html
    ! ~ worked in my case, but in next video it work
*/

const express = require('express')
const app = express()
const path = require('path')

//* builtin middleware
const staticPath = path.join(__dirname, '../public')
app.use(express.static(staticPath)) 

app.get('/', (req, res) => {
    res.send('<p>vishal skumar ss</p>')
})  
  
const port = 3000
app.listen(port, () => {
    console.log(`port http://127.0.0.1:${port}`)
})
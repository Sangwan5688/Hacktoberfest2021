/* 
    TODO: Using raw HTML in Pug template engine
    ? res.send is ~ used b/c we are dealing with template so res.render
    ? change language of pug file to html by left btn of go live
    ? btn center cass
        * table input[type="submit"] {
        *   display: block;
        *   margin: 0 auto;
        * }
*/

const express = require("express")
const path = require("path")
const app = express()
const port = 80

//! EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //* serving static files

//! PUG SPECTIFIC STUFF
app.set('view engine','pug') //* set template engine as pug
app.set('views', path.join(__dirname,'views')) //* set views dir

//! ENDPOINTS
app.get('/', (req, res)=>{ 
    let params = {
        title: 'Get GYM 🔥 Membership',
        msg : 'All pest are best 🐰🐶🐹'
    }
    res.status(400).render('index', params)
})

app.get('/about',(req, res)=>{ 
    res.send("About Page 📙📚")
})

app.get('/contact',(req, res)=>{ 
    res.send("Contact Page ☎️")
})

app.get('/404',(req, res)=>{ 
    res.send("Page ❌ found")
})


//! STARTING SERVER
app.listen(port, ()=>{ 
    console.log(`application have started suffesfully on por ${port}`);
})

 
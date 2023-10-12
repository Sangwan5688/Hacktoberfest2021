/* 
    TODO: Finishing Off NodeJs Backend of our Gym Website
    ? app.use(express.urlencoded()) use of middleware while submitting form
    ? req.body.__ is get from name tag of input/textarea
*/

const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
const port = 80

//! EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //* serving static files
app.use(express.urlencoded()) //* middleware for form data

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

app.post('/', (req, res)=>{
    let name = req.body.name
    let age = req.body.age
    let gender = req.body.gender
    let address = req.body.address
    let more = req.body.more
    console.log(name,age,gender,address,more)

    let content = `Name of client is ${name}, ${age} year old, ${gender}, residing at ${address}. More about him/her ${more}`

    fs.writeFileSync('output.txt',content)

    let params = {msg : 'Your form have been submitted successfully'}
    res.status(200).render('index', params)
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

 
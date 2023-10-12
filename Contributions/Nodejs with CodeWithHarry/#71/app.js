/* 
    TODO: Writing our first Express App
    ? "server": "nodemon app.js" in package.json
    ? postmon get req with ( localhost)
*/

const express = require("express")
const app = express()
const port = 80

app.get('/',(req, res)=>{ 
    res.send("Home Page 🏡")
})

app.post('/',(req, res)=>{ 
    res.status(400).send("Something special 🧲")
})

app.get('/about',(req, res)=>{ 
    res.send("About Page 📙📚")
})

app.post('/about',(req, res)=>{ 
    res.send("Hidden About Page 🕵️‍♂️")
})

app.get('/404',(req, res)=>{ 
    res.send("Page ~ found 📃📄📟")
})

app.listen(port, ()=>{ 
    console.log(`application have started suffesfully on por ${port}`);
})

 
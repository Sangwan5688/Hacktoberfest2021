/* 
    TODO: Static Files & Installing Pug template engine
    ? template engine 
        * pug node js express
        * https://expressjs.com/en/guide/using-template-engines.html
        * https://pugjs.org/api/getting-started.html with integration with pug
*/

const express = require("express")
const path = require("path")
const app = express()
const port = 80

//* for serving static files
app.use('/static', express.static('static')) 

//* Set template engine as pug
app.set('view engine','pug')

app.set('views', path.join(__dirname,'views'))

app.get('/pug_demo', (req, res) => {
    res.render('demo', { 
        title: 'Hey vishal', 
        message: 'Hello 👏',
        body: 'this is content 📄📰'
    })
})





app.get('/',(req, res)=>{ 
    res.send("Home Page 🏡")
})

app.get('/about',(req, res)=>{ 
    res.send("About Page 📙📚")
})

app.get('/404',(req, res)=>{ 
    res.send("Page ~ found 📃📄📟")
})

app.listen(port, ()=>{ 
    console.log(`application have started suffesfully on por ${port}`);
})

 
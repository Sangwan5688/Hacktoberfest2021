/* 
    TODO: Saving Data To The Database 
    ? npm i body-parser
    ? domain-name(godaddy) + vps(gps)
*/

const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const app = express()
const port = 80

//! mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance'); 

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error 🐹'))

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String
});

const Contact = mongoose.model('Contact', contactSchema);

//! EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) 
app.use(express.urlencoded())
 
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

app.post('/contact', (req, res) => {
    let data = new Contact(req.body);

    data.save().then(()=>{
        console.log("this item have been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to database")
    });

    const params = {
        title: 'Get Dance 🔥 Membership',
    }
    res.status(200).render('contact.pug',params)
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
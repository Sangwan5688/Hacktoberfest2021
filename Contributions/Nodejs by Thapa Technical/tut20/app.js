/* 
    TODO: Send Emails with Nodemailer using Ethereal
    ? smtp protocol for sending mail
    ? https://nodemailer.com/about/
    ? smtp server -> https://ethereal.email/
*/

const sendMail = require('./controllers/sendMail')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello afs  World!')
})

app.get('/send', sendMail)

const start = async () => {
    try {
        const port = 80
        const hostname = '127.0.0.1';
        app.listen(port, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        })
    } catch (error) {
        console.log("Err occur")
    }
}


start()
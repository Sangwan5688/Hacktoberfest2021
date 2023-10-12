const express = require('express')
const bcrypt = require('bcrypt')
const Register = require('../models/register')

const router = new express.Router()
let orgData = undefined;

router.get('/', async (req, res) => {
    res.render('home.hbs', {
        name : orgData != undefined ? orgData.name : ""
    })
})

router.get('/about', async (req, res) => {
    res.render('about.hbs')
})

router.get('/login', async (req, res) => {
    res.render('login.hbs')
})

router.post('/login', async (req, res) => {
    try {
        const {email, pwd} = req.body
        let data = await Register.findOne({email})
        orgData = data
        let isMatch = await bcrypt.compare(pwd, data.pwd)

        //* middleware jwt
        const token = await data.generateToken()

        if(!isMatch) {
            res.status(200).send('Invalid password')
            return;
        }
        res.render('home.hbs')
    } catch (err) { console.log(`error ${err}`) }
})

router.get('/register', async (req, res) => {
    try {
        res.render('register.hbs')  
    } catch (err) { console.log(`error ${err}`) }
})

router.post('/register', async (req, res) => {
    try {
        let pwd = req.body.pwd
        let cpwd = req.body.cpwd
        if(pwd === cpwd) {
            const obj = new Register(req.body)

            //* middleware jwt
            const token = await obj.generateToken()

            res.cookie("jwt", token, {
                expires : new Date(Date.now() + 3000),
                httpOnly : true
            })

            const data = await obj.save()
            res.status(200).render('home.hbs')
        } else res.send('Password collide')
    } catch (err) { console.log(`error ${err}`) }
})

router.get('*', async (req, res) => {
    res.render('error.hbs')
})

module.exports = router
const express = require('express')
const ContactMsg = require('../models/contactMsg')
const router = new express.Router()

router.get('/', async (req, res) => {
    res.render('home.hbs')
})

router.get('/about', async (req, res) => {
    res.render('about.hbs')
})

router.get('/contact', async (req, res) => {
    res.render('contact.hbs')
})

router.post('/contact', async (req, res) => {
    try {
        const obj = new ContactMsg(req.body)
        const data = await obj.save()
        res.status(201).render('home.hbs')
    } catch (err) { 
        console.log(err)
        res.status(400).send(err) 
    }
})

router.get('/service', async (req, res) => {
    res.render('service.hbs')
})

module.exports = router
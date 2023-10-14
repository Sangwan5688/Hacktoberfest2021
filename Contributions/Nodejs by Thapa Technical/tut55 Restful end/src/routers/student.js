const express = require('express')
const Student = require('../models/students')

//* 1. Create a new router
const router = new express.Router()

//* 2. we need to define router
router.post('/students', async (req, res) => {
    try {
        const obj = new Student(req.body)
        const data = await obj.save()
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

router.get('/students', async (req, res) => {
    try {
        const data = await Student.find();
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

router.get('/students/:_id', async (req, res) => {
    try {
        const data = await Student.find(req.params);
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

router.delete('/students/:_id', async (req, res) => {
    try {
        const data = await Student.findByIdAndDelete(req.params);
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

router.patch('/students/:_id', async (req, res) =>  {
    try {
        // const data = await Student.findByIdAndUpdate(req.params, req.body) 
        // ? to get copy of updated one
        const data = await Student.findByIdAndUpdate(req.params, req.body, {
            new : true
        })
        res.status(200).send(data)
    } catch (err) { res.status(400).send(`error ${err}`) }
})

module.exports = router
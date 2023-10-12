const express = require('express')
const MenRanking = require('../models/men')

const router = new express.Router()

router.get('/', async (req, res) => {
    res.end('vishal BOIII')
})

//* POST
router.post('/mens', async (req, res) => {
    try {
        const obj = new MenRanking(req.body)
        const data = await obj.save()
        res.status(200).send(data)
    } catch (err) { console.log(`error ${err}`) }
})

//* GET
router.get('/mens', async (req, res) => {
    try {
        const data = await MenRanking.find().sort({"ranking" : 1})
        res.status(200).send(data)
    } catch (err) { console.log(`error ${err}`) }
})

router.get('/mens/:_id', async (req, res) => {
    try {
        const data = await MenRanking.find(req.params)
        res.status(200).send(data)
    } catch (err) { console.log(`error ${err}`) }
})

//* Update
router.patch('/mens/:_id', async (req, res) => {
    try {
        const data = await MenRanking.findByIdAndUpdate(req.params, req.body, {
            new : true
        })
        res.status(200).send(data)
    } catch (err) { console.log(`error ${err}`) }
})

//* Delete
router.delete('/mens/:_id', async (req, res) => {
    try {
        const data = await MenRanking.findByIdAndDelete(req.params)
        res.status(200).send(data)
    } catch (err) { console.log(`error ${err}`) }
})

module.exports = router
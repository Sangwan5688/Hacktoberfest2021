const jwt = require('jsonwebtoken')
const Register = require('../models/register')

const auth = async (req, res, next) => {
    try {
        if (jwt === null) res.send('error')
        const token = req.cookies.jwt
        const verfiyUser = jwt.verify(token, process.env.SECRET_KEY)

        const user = await Register.findOne({
            _id: verfiyUser._id
        })

        //* logout  
        req.token = token
        req.user = user

        next()
    } catch (err) {
        console.log(`error ${err}`)
        res.status(400).json(err)
    }
}

module.exports = auth
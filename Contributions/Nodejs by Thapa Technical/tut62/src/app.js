/* 
    TODO: JWT
    ? jwt.sign(object, string)
    ? string must be atleast 32 character
    ? jwt token is stateless
*/

require('dotenv').config()
const jwt = require('jsonwebtoken')

const createToken = async () => {
    const data = await jwt.sign({ _id : "64522666232b84682d895ed8" }, process.env.SECRET_KEY, {
        expiresIn: "30 days"
    })
    console.log(data)
    //? header.payload.signature

    const check = await jwt.verify(data, process.env.SECRET_KEY)
    console.log(check)
}

createToken();
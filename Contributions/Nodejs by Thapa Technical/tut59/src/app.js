/* 
    TODO: Encryption vs Hashing
    ? Encry is two way comm , apple <-> adssadf
    ? Hashing is one way comm
    ? npm i bcrypt
*/


const bcrypt = require('bcrypt')

const securePassword = async (password) => {
    const data = await bcrypt.hash(password, 10)
    console.log(data)

    const flag = await bcrypt.compare(password, data)
    console.log(flag)
}

securePassword("1231231")
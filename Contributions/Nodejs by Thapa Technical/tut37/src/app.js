/* 
    TODO : introduce Mongoose
    ? npm init -y
    ? mongoose.connect() return promise
*/

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Learning_mongoose').then(() => {
    console.log('connected mongoose')
}).catch((err) => {
    console.log(err)
})
const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/Olympic`)
.then(() => console.log('connected mongo..'))
.catch(() => console.log(`error ${error}`))

module.exports = mongoose
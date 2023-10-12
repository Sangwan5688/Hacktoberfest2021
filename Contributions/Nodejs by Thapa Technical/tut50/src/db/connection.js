const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/Human`)
.then(() => console.log('connected mongo..'))
.catch((err) => console.log(`error ${error}`))
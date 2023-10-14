/* 
    TODO : introduce Mongoose
    ? schema : it defines structure of document i.e default value, validators etc
    ? mongoose model is a wrapper on mongoose schema . it provide interface to database for CURD etc    
*/

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Learning_mongoose')
.then(() => console.log('connected mongoose'))
.catch((err) => console.log(err))

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content_type: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

// collection creation
const Obj = new mongoose.model("Video", videoSchema)
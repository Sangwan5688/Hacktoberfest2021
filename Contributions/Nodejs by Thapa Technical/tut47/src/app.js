/* 
    TODO: Built-In Validation
    ? https://mongoosejs.com/docs/schematypes.html
    ? unique is ~ a validator in mongoose
*/

const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/Human`)
.then(() => console.log('connect'))
.catch((err) => console.log(`error ${error}`))

const personSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        lowercase: true,
        trim : true,
        minlength : 2,
        maxlength : 100,
        enum: ["vishal kumar", "vivek kumar", "budha 🔥🐹"]
    },
    age : Number,
    DOB : {
        type : Date,
        default : Date.now
    }
})

//* Collection
const Person = new mongoose.model('Person', personSchema)

const setCollection = async () => {
    try {
        let obj = new Person({
            name : '122',
            age : 45
        })
        let res = await obj.save();
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

setCollection();
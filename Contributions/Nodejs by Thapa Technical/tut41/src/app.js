const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/Human`)
.then(() => console.log('connected'))
.catch((err) => console.log(`error ${error}`))

const personSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : Number,
    DOB : {
        type: Date,
        default: Date.now
    }
})

//* Collection
const Person = new mongoose.model('Person', personSchema)

const getDocument = async () => {
    const result = await Person.find({}, {_id : 0, name : 1}).limit(1)
    // const result = await Person.find({}).select({_id : 0, name : 1}).limit(1)
    console.log(result)
}

getDocument();    
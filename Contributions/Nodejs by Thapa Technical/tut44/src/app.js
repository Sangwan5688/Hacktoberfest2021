/* 
    TODO: Sorting and Count Query Methods
*/

const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/Human`)
.then(() => console.log('connect'))
.catch((err) => console.log(`error ${error}`))

const personSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : Number,
    DOB : {
        type : Date,
        default : Date.now
    }
})

//* Collection
const Person = new mongoose.model('Person', personSchema)

const getCollection = async () => {
    const result = await Person.find()
    .select({_id : 0, name : 1})
    console.log(result)
    console.log(result.length) 
    console.log(result.sort())

}

getCollection();

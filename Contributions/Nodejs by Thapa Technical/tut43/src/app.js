/* 
    TODO: Logical Query Operators
    ? $nor, $and, $not, $or
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
    const result = await Person.find({$or : [{age : 20}, {name: 'Ramesh'}]})
    .select({_id : 0, name : 1}) 
    console.log(result) 
}

getCollection();

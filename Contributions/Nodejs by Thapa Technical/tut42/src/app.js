/* 
    TODO: Comparison Query Operators
    ? $eq, $gt, $gte, $lt, $lte, $ne, $nin, $in
*/

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Human')
.then(() => console.log('connected'))
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
    //* document
    // const result = await Person.find({ age : {$in : 18}});
    const result = await Person.find({ age : {$in : [18,21]}});
    console.log(result)
}


getCollection();
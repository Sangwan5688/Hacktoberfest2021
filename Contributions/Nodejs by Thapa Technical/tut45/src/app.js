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

const updateCollection = async () => {
    try {
        const res = await Person.updateOne({name : 'vishal'}, {name : 'vishal kumar'})
        console.log(res)
        const result = await Person.find({}, {_id : 0, name: 1})
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

updateCollection();

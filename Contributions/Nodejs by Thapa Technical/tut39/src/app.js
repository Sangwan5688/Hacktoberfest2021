/* 
    TODO: Create and Insert Mongoose
    ? object_name.save() return promise
*/

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Human')
.then(()=>console.log('connected'))
.catch((err)=>console.log('error'))

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

//* collection
const Person = new mongoose.model('Person', personSchema)

//* document
const obj = new Person({
    name : 'vishal',
    age : 20,
})

obj.save()
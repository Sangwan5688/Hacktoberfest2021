/* 
    TODO: Insert Many in Mongoose
    ? Model_name.insertMany({object_name, object_name})
*/
const mongoose = require('mongoose')

mongoose.connect(`mongodb://127.0.0.1:27017/Human`)

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

//* collections
const Person = mongoose.model('Person', personSchema)

const createDocument = async () => {
    try {
        //* document 
        const obj1 = new Person({
            name : 'yash B',
            age : 20,
        })

        const obj2 = new Person({
            name : 'Suraj',
            age : 20,
        })

        const result = await Person.insertMany([obj1, obj2]);
        console.log(result)
    } catch (error) { console.log(`error ${error}`) }
}

createDocument()
/* 
    TODO: Create Your Own Custom Validation
    ? validate(val) , modern way of writting validate
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
    age : {
        type : Number,
        validate(val) {
            if(val < 0) throw new Error("Enter valid Value")
        }
    },
    DOB : {
        type : Date,
        default : Date.now
    }
})

//* Collection
const Person = new mongoose.model('Person', personSchema)

const createCollection = async () => {
    try {
        const obj = new Person({
            name : 'Salman 🐹🔥',
            age : -50
        })
        let res = await obj.save();
        console.log(res)
    } catch (error) { console.log(error) }
}

createCollection();
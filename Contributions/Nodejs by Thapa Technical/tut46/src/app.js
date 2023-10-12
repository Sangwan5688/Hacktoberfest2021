/* 
    TODO: Delete the Documents
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

const deleteDocument = async () => {
    try {
        const res = await Person.deleteOne({ age : 22 })
        console.log(res)
    
        const data = await Person.find({}, {_id : 0, name : 1})
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

deleteDocument();

const deleteDocuments = async (_id) => {
    try {
        const res = await Person.findByIdAndDelete({ _id })
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

deleteDocuments("64510da23f83cb4f0dae1a59");
const mongoose = require('mongoose')
const validator = require('validator')

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 2,
        maxlength : 300,
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email Id Already Present"],
        validate(val) {
            if(!validator.isEmail(val)) throw new Error('Invalid Email')
        },
    },
    phone : {
        type : Number,
        min : 10,
        required : true,
        unique : [true, "Phone Number Already Present"],
    },
    address : {
        type : String,
        required : true,
        max : 500,
    },
})

//* create collection or model
const Student = new mongoose.model('Student', studentSchema)

module.exports = Student
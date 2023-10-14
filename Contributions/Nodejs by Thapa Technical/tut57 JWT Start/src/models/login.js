const mongoose = require('mongoose')
const validator = require('validator')

const loginSchema = mongoose.Schema({
    name : {
        type : String,
        required : true, 
        trim : true,
    },
    email : {
        type : String,
        require : true,
        trim : true,
        unique : true,
        validate(val) {
            if(!validator.isEmail(val)) throw new Error('Invalid Email')
        }
    },
    phone : {
        type : Number,
        required : true,
        trim : true,
        min : 10
    },
    pwd : {
        type : String,
        required : true,
        trim : true,
    },
    cpwd : {
        type : String,
        required : true,
        trim : true,
    },
})

//* collection or model
const Login = new mongoose.model('Login', loginSchema)

module.exports = Login
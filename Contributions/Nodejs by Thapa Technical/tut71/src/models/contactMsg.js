const mongoose = require('mongoose')
const validator = require('validator')

const contactMsgSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate(val) {
            if(!validator.isEmail(val)) throw new Error('Invalid Email')
        }
    },
    phone : {
        type : Number,
        required : true,
        minlength : 10,
    },
    message : {
        type : String, 
        required : true,
    },
    date : {
        type : Date,
        required : Date.now()
    }
})

//* collection or model 
const ContactMsg = new mongoose.model('ContactMsg', contactMsgSchema)

module.exports = ContactMsg
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const registerSchema = mongoose.Schema({
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
    gender : {
        type : String,
        required : true,
    },
    phone : {
        type : String,
        required : true,
        trim : true,
        min : 10
    },
    age : {
        type : String,
        required : true,
        trim : true,
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

//* pre hash
registerSchema.pre("save", async function (next) {
    if(this.isModified("pwd")) {
        this.pwd = await bcrypt.hash(this.pwd, 10)
        this.cpwd = undefined
        next()
    }
})

//* collection or model
const Register = new mongoose.model('Register', registerSchema)

module.exports = Register
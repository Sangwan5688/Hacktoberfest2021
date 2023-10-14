const mongoose = require('mongoose')
const validator = require('validator');

mongoose.connect(`mongodb://127.0.0.1:27017/Human`)
.then(() => console.log('connected'))
.catch((err) => console.log(`error ${error}`))

const loginSchema = mongoose.Schema({
    Name : String,
    Email : {
        type : String,
        required : true,
        unique : true,
        validate(val) {
            if(!validator.isEmail(val)) {
                throw new Error('Incorrect Email')
            }
        }
    },
    Password : String
})

//* Collection
const Login = new mongoose.model('Login', loginSchema)

const setCollection = async () => {
    try {
        const obj = new Login({
            Name : 'vivek kumar',
            Email : 'abc11@gmail',
            Password : '1234**'
        })
        const res = await obj.save()
        console.log(res)
    } catch (error) { console.log(`error ${error}`) }
}


setCollection();
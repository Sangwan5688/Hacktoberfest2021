const mongoose = require('mongoose')

const menSchema = mongoose.Schema({
    ranking : {
        type : Number,
        required : true,
        unique : true,
    },
    name : {
        type : String, 
        required : true,
        trim : true,
    },
    dob : {
        type : Date,
        required : true,
        trim : true,
        default : Date.now,
    },
    country : {
        type : String,
        required : true,
        trim : true,
    },
    score : {
        type : Number,
        required : true,
        trim : true,
    },
    event : {
        type : String,
        default : "100m",
    },
})

//* collection or model
const MenRanking = new mongoose.model('MenRanking', menSchema)

module.exports = MenRanking
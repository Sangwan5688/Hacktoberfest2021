/* 
    TODO: Learning mongoose
    ? npm install mongoose
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/vishalCart'); 


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error 🐹'))
db.once('open', function() {
    console.log("we are connected 🐰🐶🐹")
})

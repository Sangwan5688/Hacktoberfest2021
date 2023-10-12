/* 
    TODO: Learning mongoose
    ? best doc for refrence
    ? with help of {mongoose or py} we are connecting to mongod
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/vishalCart'); 


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error 🐹'))
db.once('open', function() {
    console.log("we are connected 🐰🐶🐹")
})
 
const kittySchema = new mongoose.Schema({
    name: String,
    age: Number,
    owner: String,
});
  
kittySchema.methods.speak = function speak() {
    const greeting = this.name
        ? 'Meow name is ' + this.name + ', My age is ' + this.age + ', owner name is ' + this.owner
        : 'I don\'t have a name & age';
    console.log(greeting);
}; 
  
const Kitten = mongoose.model('Kitten', kittySchema);

const vishalDog = new Kitten({ name: 'Gymmy 🐹', age: 20, owner: 'vishal' });
const vikasDog = new Kitten({ name: 'Cat 🙀', age: 21, owner: 'vikas' });
 
vishalDog.save()
vikasDog.save()

vikasDog.speak()
vishalDog.speak()

Kitten.find({name :"Gymmy 🐹"})
.then(res => console.log(res))
.catch((err) => console.log(err))

 
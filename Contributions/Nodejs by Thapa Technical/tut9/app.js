/* 
    TODO: 📁 PATH Module
    ? path.parse = dirname + extname + basename + name + root
*/

const path = require('path')

console.log(path.dirname('C:/Users/yadav/OneDrive/Desktop/github/Node-Backend/Thapa Technical/tut9/app.js'))
console.log(path.extname('C:/Users/yadav/OneDrive/Desktop/github/Node-Backend/Thapa Technical/tut9/app.js'))
console.log(path.basename('C:/Users/yadav/OneDrive/Desktop/github/Node-Backend/Thapa Technical/tut9/app.js'))

console.log(path.parse('C:/Users/yadav/OneDrive/Desktop/github/Node-Backend/Thapa Technical/tut9/app.js'))
const fs = require('fs')

let data = fs.readFile('content.txt', 'utf-8', (err, data) => {
    if(err) console.log("some error occur")
    console.log(data)
})

console.log(data)
console.log("after data")
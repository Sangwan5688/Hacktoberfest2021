const fs = require('fs')
const bioData = {
    name : 'vishal',
    age : 20,
    sex : 'male'
}


fs.writeFile('content.txt', JSON.stringify(bioData), (err) => {
    if(err) console.log("write err")
    console.log("completed write")
})

let data = fs.readFile('content.txt', 'utf-8', (err, data) => {
    if(err) console.log("read err")
    console.log("completed read")
    console.log(data)
    console.log(JSON.parse(data))
})


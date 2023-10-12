/* 
    TODO: Node.JS Asynchronous File System Core Modules
    ? callback means once your code run then call me back
    ? sync is line by line
    ? async is all line in once
 */

const fs = require('fs')

fs.writeFile('content.txt', 'my name is khan 🐹', (err)=> {
    if(err) console.log("error")
    console.log("write completed")
})

fs.appendFile('content.txt', ', Good Morning bhai 🔥', (err)=> {
    if(err) console.log("error")
    console.log("append completed")
})

let data = fs.readFile('content.txt', 'utf-8', (err, data) => {
    if(err) console.log("error")
    console.log("read completed")
    console.log(data)
})

console.log("lol ", data)

/* 
    TODO: Module
    ? https://nodejs.org/dist/latest-v18.x/docs/api/fs.html
    ? sync is line by line
    ? async is all line in once
*/

const fs = require('fs')

let data = "my name is khan"
fs.writeFileSync("content.txt", data)

let newData = fs.readFileSync('content.txt', "utf-8")
console.log(newData)

fs.appendFileSync('content.txt', ', Good Morning bhai')

newData = fs.readFileSync('content.txt', 'utf-8')
console.log(newData)

//* rename file
fs.renameSync('content.txt', 'changed.txt')
setTimeout(() => {}, 3000);
fs.renameSync('changed.txt', 'content.txt')
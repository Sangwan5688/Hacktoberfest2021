/* 
    TODO: MINI Challenge
    ? fs.unlinkSync('mybio.txt') - delete file
    ? fs.mkdirSync
    ? fs.rmdirSync
*/

const fs = require('fs')

let data = 'my name is vishal, I am currently pursing B.tech in 3yr'
fs.writeFileSync('bio.txt', data)

fs.appendFileSync('bio.txt', ', my hobbie is playing chess')

let newData = fs.readFileSync('bio.txt', 'utf-8')
console.log(newData)

fs.renameSync('bio.txt', 'mybio.txt')

//* delete file
fs.unlinkSync('mybio.txt')
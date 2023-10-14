/* 
    TODO: Synchronous vs Asynchronous
 */

const fs = require('fs')

let data = fs.readFileSync('content.txt', 'utf-8')

console.log(data)
console.log("after data")
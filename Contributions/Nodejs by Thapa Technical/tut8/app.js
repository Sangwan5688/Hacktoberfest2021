/* 
    TODO: Operating System Info
    ? https://nodejs.org/dist/latest-v18.x/docs/api/os.html
    ? arch -> architecture
*/

const os = require('os')

console.log(os.arch())
console.log(os.freemem())
console.log(`${os.freemem()/1024/1024/1024} GB`)
console.log(`${os.totalmem()/1024/1024/1024} GB`)
console.log(os.hostname())
console.log(os.platform())
console.log(os.tmpdir())
console.log(os.type())


/* 
    TODO: Mini Challange
*/

const fs = require('fs')

fs.mkdir('vishal', (err) => {
    if(err) console.log("error occur in making dir")
})

fs.writeFile('vishal/content.txt', 'my name is khan 🔥', (err) => {
    if(err) console.log("error occured in write")
})

fs.appendFile('vishal/content.txt', ', Good Morning bhai 🐹', (err) => {
    if(err) console.log("error occured in append")
})

fs.readFile('vishal/content.txt', 'utf-8', (err, data) => {
    if(err) console.log("error occur in reading")
    console.log(data)

    fs.rename('vishal/content.txt', 'vishal/bio.txt', (err) => {
        if(err) console.log("error occur in rename")

        fs.unlink('vishal/bio.txt', (err) => {
            if(err) console.log("error occur in unlink")

        })
        
        fs.rmdir('vishal', (err) => {
            if(err) console.log("error occur in remove dir")
        })
    })
})



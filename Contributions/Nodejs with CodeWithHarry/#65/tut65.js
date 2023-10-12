/* 
    TODO: Blocking vs #n Blocking execution
    ? Blocking or Sync :
        * line by line execution
    ? #n Blocking or Async or callback function : 
        * line by line ~ execution
        * callbacks will fire
*/

const fs = require("fs")
let text = fs.readFile("info.txt","utf-8",(err,data)=>{
    if(err) throw err;
    console.log(data);
})
console.log("this is one of data");

let dummy = fs.readFile("info1.txt","utf-8",(err,data)=>{
    if(err) {
        console.log(err);
        //? throw err;
    }
    console.log(data);
})
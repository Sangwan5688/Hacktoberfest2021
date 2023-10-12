/* 
    TODO: what is module?
    ? to node js module offical website
 */

const fs = require("fs")

let text = fs.readFileSync("info.txt","utf-8")

console.log("content of the file is : ");
console.log(text);

console.log("creating a new file");

text = text.replace("vishal","vivek")
fs.writeFileSync("info1.txt",text)
let content = fs.readFileSync("info1.txt","utf-8")
console.log("content of new file is : ");
console.log(content);

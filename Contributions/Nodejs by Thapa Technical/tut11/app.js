/* 
    TODO: NPM (node package manager)
    ? diff b/w js obj & json is that In json key that it have double quote
    ? npm init
    ? npm i chalk@4.1.2
    ? npm i validator
    ? npm i
*/

const chalk = require('chalk')
const validator = require('validator')

console.log(chalk.blueBright("vishal"))
console.log(chalk.whiteBright("vishal"))
console.log(chalk.redBright.underline.inverse("Try Again!"))
console.log(chalk.green.underline.inverse("Success"))


let res = validator.isEmail('yadav11adu@gmail.com');

console.log(res)
console.log(chalk.greenBright.underline.inverse(res && 'vishal success'))
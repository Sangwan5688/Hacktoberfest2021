/* 
    TODO: Module Wrapper Function == IIFE
    ? --save-dev
    ? In node, indivisual file are called module.
    ? all var declare inside that file are private
    ? Module Wrapper function is used to declare var private
        * (function (exports, require, module, __filename, __dirname) {
        *   const name = 'vishal kumar'
        *   console.log(name)    
        * }) ()
    ? we use const {} = require & module.exports
*/

const name = 'vishal kumar'
console.log(name)
console.log(__dirname)
console.log(__filename) 
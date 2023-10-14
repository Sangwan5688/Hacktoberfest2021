const add = (a, b) => a + b;
const multi = (a, b) => a * b;

const name = 'vishal kumar'

//* prev method
/* 
    * module.exports.multi = multi
    * module.exports.add = add
    * module.exports.name = name
*/
module.exports = { add, name, multi }
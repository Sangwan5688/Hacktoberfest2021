/* 
    TODO: CREATE and EXPORT Our Own Modules
    ! i was using export default with import {add, name} from 'card.js'
        * exports.deafult
        * const var_name = req()
*/

const {add, name, multi}  = require('./card.js')

console.log(add(5,6))
console.log(multi(5,6))
console.log(name)
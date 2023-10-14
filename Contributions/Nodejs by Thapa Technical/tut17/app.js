/* 
    TODO: Events Module
    ? node.js has a built-in module, called "Events"
    ? where you can create, fire & listen for your own events
    ? node-event-emitter
    ? emit === onClick
    ? order => on -> emit
*/

const EventEmitter = require('events');
const event = new EventEmitter();


event.on('SayMyName', () => {
    console.log('my name is khan 🔥🐹')
})

//* multiple callback
event.on('SayMyName', () => {
    console.log('my name is Vishal 🔥🐹')
})

event.emit('SayMyName') //* SayMyName()

//* with Parameter
event.on('CheckPage', (status, msg) => {
    console.log(status, msg) 
})

event.emit('CheckPage', 200, 'ok')
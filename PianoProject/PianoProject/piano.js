// Developed By Engineer Elhamuddin Taheri
// B.Sc in Software Engineering (Kabul University) 

// getting key elements
let k1 = document.querySelector('#k1');
let k2 = document.querySelector('#k2');
let k3 = document.querySelector('#k3');
let k4 = document.querySelector('#k4');
let k5 = document.querySelector('#k5');
let k6 = document.querySelector('#k6');
let k7 = document.querySelector('#k7');
let k8 = document.querySelector('#k8');
let k9 = document.querySelector('#k9');
let k10 = document.querySelector('#k10');
let k11 = document.querySelector('#k11');

// inserting the music files in to the js file:
let s1 = new Audio('sounds/key1.mp3')
let s2 = new Audio('sounds/key2.mp3')
let s3 = new Audio('sounds/key3.mp3')
let s4 = new Audio('sounds/key4.mp3')
let s5 = new Audio('sounds/key5.mp3')
let s6 = new Audio('sounds/key6.mp3')
let s7 = new Audio('sounds/key7.mp3')
let s8 = new Audio('sounds/key8.mp3')
let s9 = new Audio('sounds/key9.mp3')
let s10 = new Audio('sounds/key10.mp3')
let s11 = new Audio('sounds/key11.mp3')

// events for white keys
k1.addEventListener('mousedown', e => {
    s1.play()
    k1.style.backgroundColor ='lightgray';
    k1.addEventListener('mouseup', e => {
        k1.style.backgroundColor = 'white';
        
    })
})

k3.addEventListener('mousedown', e => {
    s3.play()
    k3.style.backgroundColor ='lightgray';
    k3.addEventListener('mouseup', e => {
        k3.style.backgroundColor = 'white';
        
    })
})

k5.addEventListener('mousedown', e => {
    s5.play()
    k5.style.backgroundColor ='lightgray';
    k5.addEventListener('mouseup', e => {
        k5.style.backgroundColor = 'white';
        
    })
})

k7.addEventListener('mousedown', e => {
    s7.play()
    k7.style.backgroundColor ='lightgray';
    k7.addEventListener('mouseup', e => {
        k7.style.backgroundColor = 'white';
        
    })
})

k9.addEventListener('mousedown', e => {
    s9.play()
    k9.style.backgroundColor ='lightgray';
    k9.addEventListener('mouseup', e => {
        k9.style.backgroundColor = 'white';
        
    })
})

k11.addEventListener('mousedown', e => {
    s11.play()
    k11.style.backgroundColor ='lightgray';
    k11.addEventListener('mouseup', e => {
        k11.style.backgroundColor = 'white';
        
    })
})

// events for black keys
k2.addEventListener('mousedown', e => {
    s2.play()
    k2.style.backgroundColor ='gray';
    k2.addEventListener('mouseup', e => {
        k2.style.backgroundColor = 'black';
        
    })
})

k4.addEventListener('mousedown', e => {
    s4.play()
    k4.style.backgroundColor ='gray';
    k4.addEventListener('mouseup', e => {
        k4.style.backgroundColor = 'black';
        
    })
})

k6.addEventListener('mousedown', e => {
    s6.play()
    k6.style.backgroundColor ='gray';
    k6.addEventListener('mouseup', e => {
        k6.style.backgroundColor = 'black';
        
    })
})

k8.addEventListener('mousedown', e => {
    s8.play()
    k8.style.backgroundColor ='gray';
    k8.addEventListener('mouseup', e => {
        k8.style.backgroundColor = 'black';
       
    })
})

k10.addEventListener('mousedown', e => {
    s10.play()
    k10.style.backgroundColor ='gray';
    k10.addEventListener('mouseup', e => {
        k10.style.backgroundColor = 'black';
       
    })
})



// Developed By Engineer Elhamuddin Taheri
// B.Sc in Software Engineering (Kabul University)
let word = document.getElementById('word')
let mean = document.getElementById('mean')
let btn = document.getElementById('btn')
let table = document.getElementById('vocab')

btn.addEventListener('click', e => {
    if (word.value && mean.value){
        table.innerHTML += 
        `<tr>
            <td>${word.value}</td>
            <td>${mean.value}<span>&#10005</span></td>
        </tr>
        `
        word.value = ''
        mean.value = ''
        }
    else{
        window.alert('Some fields remained empty!')
    }
})

table.addEventListener('click', e => {
    if(e.target.nodeName === 'SPAN'){
        e.target.parentElement.parentElement.style.display='none'
    }
})

// variables:
let search = document.querySelector('#search')    
let but = document.querySelector('#button')
let addd = document.querySelector('#add')
let result = document.querySelector("#result")
let key = document.querySelector("#key")
let val = document.querySelector('#value')
let rem = document.querySelector("#rem")
let hazf =  document.querySelector("#hazf")

// buttons events
but.addEventListener("click", e => {
    result.textContent = localStorage.getItem(search.value)
    search.value=""
    
})

addd.addEventListener("click",e => {
    localStorage.setItem(key.value,val.value)
    alert(`Successful entry. ${key.value} added as ${val.value}`)
    key.value = ''
    val.value = ''
})

hazf.addEventListener("click", e => {
    localStorage.removeItem(rem.value)
    rem.value = ''
})
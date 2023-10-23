// BY Engineer Elhamuddin Taheri
// getting elements by DOM:
let year = document.querySelector("#year")
let month = document.querySelector("#month")
let day = document.querySelector("#day")
let wday = document.querySelector("#wday")
let hour = document.querySelector("#hour")
let minute = document.querySelector("#minute")
let seconds = document.querySelector("#seconds")

// timming logic:
let time = new Date()
let update = () => {
    let time = new Date()
    let _year = String(time.getFullYear())
    let _month = String(time.getMonth())
    let _day = String(time.getDate())
    let _wday = String(time.getDay())
    let _hour = String(time.getHours())
    let _minute = String(time.getMinutes())
    let _seconds = String(time.getSeconds())
    
    //------------------------------------------------------
    year.textContent = _year
    if(_month == '0'){month.textContent = 'Jan'}
    else if(_month == '1'){month.textContent = 'Feb'}
    else if(_month == '2'){month.textContent = 'Mar'}
    else if(_month == '3'){month.textContent = 'Apr'}
    else if(_month == '4'){month.textContent = 'May'}
    else if(_month == '5'){month.textContent = 'Jun'}
    else if(_month == '6'){month.textContent = 'July'}
    else if(_month == '7'){month.textContent = 'Aug'}
    else if(_month == '8'){month.textContent = 'Sep'}
    else if(_month == '9'){month.textContent = 'Oct'}
    else if(_month == '10'){month.textContent = 'Nov'}
    else if(_month == '11'){month.textContent = 'Dec'}
    day.textContent = _day
    if(_wday == '1'){wday.textContent = 'Mon'}
    else if(_wday == '2'){wday.textContent = 'Tues'}
    else if(_wday == '3'){wday.textContent = 'Wed'}
    else if(_wday == '4'){wday.textContent = 'Thur'}
    else if(_wday == '5'){wday.textContent = 'Fri'}
    else if(_wday == '6'){wday.textContent = 'Sat'}
    else if(_wday == '7'){wday.textContent = 'Sun'}
    hour.textContent = _hour
    minute.textContent = _minute
    seconds.textContent = _seconds
}
//------------ calling update function in an intrval:
setInterval(
    update,1000
)


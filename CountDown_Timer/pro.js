const end_date="31 Dec 2023 08:00:00 AM"

document.getElementById("end_date").innerText =end_date;
const inputs = document.querySelectorAll("input")

const clock = () => {

const end = new Date(end_date)
const now = new Date()
const diff = (end-now) / 1000;

if (diff < 0) return;

inputs[0].value = Math.floor(diff / 3600 / 24);
inputs[1].value = Math.floor(diff / 3600) % 24;
inputs[2].value = Math.floor(diff / 60) % 60;
inputs[3].value = Math.floor(diff) % 60;

}

clock();

setInterval(

    () => {
        clock()
    },
    1000

)
console.log("this is module.js");

function average(arr) {
    let sumi = 0;
    arr.forEach(element => {
        sumi += element;
    });
    return sumi/arr.length;
}

module.exports = average
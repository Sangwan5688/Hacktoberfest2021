console.log("this is module1");

function average(arr) {
    let sumi = 0;
    arr.forEach(element => {
        sumi += element;
    });
    return sumi/arr.length;
}

module.exports = {
    avg : average,
    name : 'vishal',
    repo : 'github'
}
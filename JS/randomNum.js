let min = +prompt('Please enter a minimum number')
let max = +prompt('Please enter a maximum number')
let random = Math.floor(Math.random() * (max - min + 1)) + min;
let num = +prompt('Please find the guessed number');
while (num != random){
    if (num > random){
        num = +prompt(`Your guess is too high! Try again`);
    } else{
        num = +prompt(`Your guess is too low! Try again`);
    }
}
alert("Congratulations! You've got the number!")
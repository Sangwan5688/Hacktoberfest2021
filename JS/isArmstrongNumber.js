// Function to check if a number is an Armstrong number
function isArmstrongNumber(number) {
    const numStr = number.toString();
    const numDigits = numStr.length;
    let sum = 0;

    for (let i = 0; i < numDigits; i++) {
        const digit = parseInt(numStr[i]);
        sum += Math.pow(digit, numDigits);
    }

    return sum === number;
}

// Example usage
const numberToCheck = 153; // Change this to the number you want to check
if (isArmstrongNumber(numberToCheck)) {
    console.log(numberToCheck + " is an Armstrong number.");
} else {
    console.log(numberToCheck + " is not an Armstrong number.");
}
